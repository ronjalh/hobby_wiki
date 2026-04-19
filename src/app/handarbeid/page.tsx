import type { Metadata } from 'next';
import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { PostCard } from '@/components/post/PostCard';

export const metadata: Metadata = {
  title: 'Nål og tråd',
  description: 'Søm, broderi og arbeid med stoff.',
};

export default async function HandarbeidPage() {
  const allPosts = await db.query.posts.findMany({
    where: and(eq(posts.hobby, 'handarbeid'), eq(posts.published, true)),
    orderBy: desc(posts.publishedAt),
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-serif">Nål og tråd</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Søm, broderi og arbeid med stoff — håndlagde ting med nål og tråd.
        </p>
      </header>

      {allPosts.length === 0 ? (
        <div className="border border-[var(--color-hobby-accent-light)] rounded-2xl p-12 text-center bg-[var(--color-hobby-accent-light)]/10">
          <p className="text-muted-foreground italic">
            Ingen innlegg ennå. Kom tilbake snart! 🧵
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPosts.map((post) => (
            <PostCard
              key={post.id}
              hobby="handarbeid"
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImageUrl={post.coverImageUrl}
              publishedAt={post.publishedAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
