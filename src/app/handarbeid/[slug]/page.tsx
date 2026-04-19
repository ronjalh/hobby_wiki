import type { Metadata } from 'next';
import Link from 'next/link';
import { and, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { db } from '@/db';
import { posts } from '@/db/schema';

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
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Hjem
          </Link>
          {' / '}
          <Link href="/handarbeid" className="hover:text-foreground">
            Nål og tråd
          </Link>
        </nav>

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
