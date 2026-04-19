'use server';

import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { siteSettings, posts, instagramPosts } from '@/db/schema';
import { requireAdmin } from '@/lib/auth/roles';
import { SETTING_KEYS, type SettingKey } from '@/lib/settings';

const VALID_KEYS = new Set<string>(Object.values(SETTING_KEYS));

export async function updateSetting(key: SettingKey, value: string) {
  await requireAdmin();

  if (!VALID_KEYS.has(key)) {
    throw new Error('Ugyldig nøkkel');
  }

  const existing = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });

  if (existing) {
    await db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value });
  }

  revalidatePath('/');
  revalidatePath('/admin/forside');
}

export async function updateAllSettings(values: Record<string, string>) {
  await requireAdmin();

  const entries = Object.entries(values).filter(([k]) => VALID_KEYS.has(k));

  for (const [key, value] of entries) {
    const existing = await db.query.siteSettings.findFirst({
      where: eq(siteSettings.key, key),
    });
    if (existing) {
      await db
        .update(siteSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteSettings.key, key));
    } else {
      await db.insert(siteSettings).values({ key, value });
    }
  }

  revalidatePath('/');
  revalidatePath('/admin/forside');
}

export async function addInstagramPost(embedHtml: string) {
  await requireAdmin();

  const trimmed = embedHtml.trim();
  if (!trimmed.includes('instagram-media')) {
    throw new Error(
      'Embed-koden ser ikke riktig ut. Bruk "..." → "Embed" på et innlegg på Instagram og kopier hele HTML-blokken.',
    );
  }

  const maxOrder = await db
    .select({ max: sql<number>`COALESCE(MAX(${instagramPosts.sortOrder}), 0)` })
    .from(instagramPosts);
  const nextOrder = (maxOrder[0]?.max ?? 0) + 1;

  await db.insert(instagramPosts).values({
    embedHtml: trimmed,
    sortOrder: nextOrder,
  });

  revalidatePath('/');
  revalidatePath('/admin/forside');
}

export async function deleteInstagramPost(id: string) {
  await requireAdmin();
  await db.delete(instagramPosts).where(eq(instagramPosts.id, id));
  revalidatePath('/');
  revalidatePath('/admin/forside');
}

const MAX_FEATURED = 3;

export async function toggleFeatured(postId: string) {
  await requireAdmin();

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });
  if (!post) throw new Error('Innlegg finnes ikke');

  if (!post.published && !post.featured) {
    throw new Error('Kun publiserte innlegg kan fremheves');
  }

  // Håndhev maks-grense når vi legger til
  if (!post.featured) {
    const count = await db.$count(posts, eq(posts.featured, true));
    if (count >= MAX_FEATURED) {
      throw new Error(
        `Maks ${MAX_FEATURED} fremhevede innlegg. Fjern ett først.`,
      );
    }
  }

  await db
    .update(posts)
    .set({ featured: !post.featured, updatedAt: new Date() })
    .where(eq(posts.id, postId));

  revalidatePath('/');
  revalidatePath('/admin/forside');
  revalidatePath('/admin/innlegg');
}
