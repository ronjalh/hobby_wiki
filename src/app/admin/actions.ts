'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq, and, ne } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { requireAdmin } from '@/lib/auth/roles';
import { slugify } from '@/lib/slugify';
import { postSaveSchema, type PostSaveInput } from '@/lib/validators/post';

async function generateUniqueSlug(
  title: string,
  hobby: 'lys' | 'smykker' | 'handarbeid',
  excludeId?: string,
): Promise<string> {
  const base = slugify(title) || 'innlegg';
  let slug = base;
  let counter = 2;

  while (true) {
    const existing = await db.query.posts.findFirst({
      where: and(
        eq(posts.slug, slug),
        eq(posts.hobby, hobby),
        excludeId ? ne(posts.id, excludeId) : undefined,
      ),
    });
    if (!existing) return slug;
    slug = `${base}-${counter}`;
    counter += 1;
  }
}

export async function savePost(input: PostSaveInput) {
  const session = await requireAdmin();
  const data = postSaveSchema.parse(input);

  const slug = data.slug || (await generateUniqueSlug(data.title, data.hobby, data.id));

  const values = {
    hobby: data.hobby,
    title: data.title,
    slug,
    content: data.content,
    excerpt: data.excerpt || null,
    coverImageUrl: data.coverImageUrl || null,
    published: data.published,
    publishedAt: data.published ? new Date() : null,
    updatedAt: new Date(),
  };

  let savedId: string;

  if (data.id) {
    const [updated] = await db
      .update(posts)
      .set(values)
      .where(eq(posts.id, data.id))
      .returning({ id: posts.id });
    savedId = updated.id;
  } else {
    const [created] = await db
      .insert(posts)
      .values({
        ...values,
        authorId: session.user.id,
      })
      .returning({ id: posts.id });
    savedId = created.id;
  }

  revalidatePath(`/${data.hobby}`);
  revalidatePath(`/${data.hobby}/${slug}`);
  revalidatePath('/admin');
  revalidatePath('/admin/innlegg');

  return { id: savedId, slug };
}

export async function deletePost(postId: string) {
  await requireAdmin();

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });
  if (!post) throw new Error('Innlegg finnes ikke');

  await db.delete(posts).where(eq(posts.id, postId));

  revalidatePath(`/${post.hobby}`);
  revalidatePath('/admin');
  revalidatePath('/admin/innlegg');
}

export async function togglePublish(postId: string) {
  await requireAdmin();

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, postId),
  });
  if (!post) throw new Error('Innlegg finnes ikke');

  const nextPublished = !post.published;

  await db
    .update(posts)
    .set({
      published: nextPublished,
      publishedAt: nextPublished ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, postId));

  revalidatePath(`/${post.hobby}`);
  revalidatePath(`/${post.hobby}/${post.slug}`);
  revalidatePath('/admin/innlegg');
}

export async function savePostAndRedirect(input: PostSaveInput) {
  const { slug } = await savePost(input);
  redirect(`/admin/innlegg?saved=${encodeURIComponent(slug)}`);
}
