'use server';

import { del } from '@vercel/blob';
import { requireAdmin } from '@/lib/auth/roles';
import { uploadImageToBlob, type UploadResult } from '@/lib/blob/upload';

export async function uploadImage(
  formData: FormData,
): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get('file');
  const folderRaw = formData.get('folder');

  if (!(file instanceof File) || file.size === 0) {
    throw new Error('Ingen fil valgt');
  }

  const folder =
    folderRaw === 'lys' ||
    folderRaw === 'smykker' ||
    folderRaw === 'handarbeid'
      ? folderRaw
      : 'misc';

  return uploadImageToBlob(file, folder);
}

export async function deleteBlobImage(url: string) {
  await requireAdmin();
  try {
    await del(url);
  } catch (e) {
    console.error('Failed to delete blob:', e);
  }
}
