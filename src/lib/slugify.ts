const NORDIC_MAP: Record<string, string> = {
  å: 'a',
  Å: 'a',
  ø: 'o',
  Ø: 'o',
  æ: 'ae',
  Æ: 'ae',
  é: 'e',
  è: 'e',
  ê: 'e',
  ë: 'e',
  á: 'a',
  à: 'a',
  ä: 'a',
  ö: 'o',
  ü: 'u',
  ñ: 'n',
};

export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\u00C0-\u017F]/g, (c) => NORDIC_MAP[c] ?? c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}
