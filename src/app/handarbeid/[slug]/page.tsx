import type { Metadata } from 'next';
import { and, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { AdminEditButton } from '@/components/post/AdminEditButton';
import { BackButton } from '@/components/post/BackButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.query.posts.findFirst({
    where: and(
      eq(posts.hobby, 'handarbeid'),
      eq(posts.slug, slug),
      eq(posts.published, true),
    ),
  });
  if (!post) return { title: 'Ikke funnet' };
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function HandarbeidPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await db.query.posts.findFirst({
    where: and(
      eq(posts.hobby, 'handarbeid'),
      eq(posts.slug, slug),
      eq(posts.published, true),
    ),
  });

  if (!post) notFound();

  return (
    <article className="pb-20">
      <AdminEditButton postId={post.id} />
      {post.coverImageUrl && (
        <div className="w-full md:px-4 md:mx-auto md:max-w-4xl md:mt-6">
          <div className="aspect-[16/9] max-h-[440px] overflow-hidden bg-muted md:rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <BackButton fallbackHref="/handarbeid" fallbackLabel="Nål og tråd" />
        </div>

        <header className="space-y-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-serif leading-tight">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-sm text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString('nb-NO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
