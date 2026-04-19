import sharp from 'sharp';

const INPUT = process.argv[2];
const OUTPUT = process.argv[3];
const TARGET = (process.argv[4] ?? 'black').toLowerCase();

if (!INPUT || !OUTPUT) {
  console.error(
    'Bruk: tsx scripts/make-transparent.ts <input> <output> [black|white]',
  );
  process.exit(1);
}

async function main() {
  const img = sharp(INPUT).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  let changed = 0;
  const threshold = 35;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const isTarget =
      TARGET === 'white'
        ? r > 255 - threshold && g > 255 - threshold && b > 255 - threshold
        : r < threshold && g < threshold && b < threshold;

    if (isTarget) {
      data[i + 3] = 0;
      changed += 1;
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(OUTPUT);

  console.log(
    `✓ ${OUTPUT} skrevet. ${changed} piksler av ${data.length / 4} gjort gjennomsiktige (${((changed / (data.length / 4)) * 100).toFixed(1)}%).`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
