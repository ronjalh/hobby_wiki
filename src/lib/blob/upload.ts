import { put } from '@vercel/blob';
import sharp from 'sharp';

const MAX_WIDTH = 1600;
const QUALITY = 82;
const MAX_INPUT_BYTES = 15 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export type UploadResult = {
  url: string;
  width: number;
  height: number;
  size: number;
};

export function validateImageFile(file: File) {
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error('Bildet er for stort (maks 15 MB)');
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Må være JPEG, PNG, WebP eller GIF');
  }
}

export async function optimizeImage(buffer: Buffer): Promise<{
  buffer: Buffer;
  width: number;
  height: number;
}> {
  const pipeline = sharp(buffer)
    .rotate()
    .resize(MAX_WIDTH, MAX_WIDTH, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 4 });

  const optimized = await pipeline.toBuffer();
  const metadata = await sharp(optimized).metadata();

  return {
    buffer: optimized,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
  };
}

export async function uploadImageToBlob(
  file: File,
  folder: 'lys' | 'smykker' | 'misc' = 'misc',
): Promise<UploadResult> {
  validateImageFile(file);

  const rawBuffer = Buffer.from(await file.arrayBuffer());
  const { buffer, width, height } = await optimizeImage(rawBuffer);

  const filename = `${folder}/${Date.now()}-${crypto.randomUUID()}.webp`;
  const { url } = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/webp',
  });

  return {
    url,
    width,
    height,
    size: buffer.length,
  };
}
