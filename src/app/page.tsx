import Link from 'next/link';
import { and, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { SETTING_KEYS } from '@/lib/settings';
import { getAllSettings } from '@/lib/settings-db';
import { PostCard } from '@/components/post/PostCard';
import type { Hobby } from '@/lib/hobbies';

export default async function Home() {
  const [settings, featured] = await Promise.all([
    getAllSettings(),
    db.query.posts.findMany({
      where: and(eq(posts.featured, true), eq(posts.published, true)),
      orderBy: desc(posts.publishedAt),
      limit: 6,
    }),
  ]);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-20">
      {/* Hero */}
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-5xl md:text-6xl font-serif">
          {settings[SETTING_KEYS.heroTitle]}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
          {settings[SETTING_KEYS.heroSubtitle]}
        </p>
        <div className="pt-4 flex justify-center">
          <Link
            href="/start"
            className="rounded-2xl border border-neutral-200 px-10 py-6 text-center transition-colors hover:bg-neutral-50"
          >
            <p className="font-serif text-xl mb-1">Start eventyret</p>
            <p className="text-sm text-muted-foreground">
              Velg en verden å utforske
            </p>
          </Link>
        </div>
      </section>

      {/* Fremhevede innlegg */}
      {featured.length > 0 && (
        <section className="mb-20 space-y-6">
          <h2 className="text-3xl font-serif text-center">Fremhevede prosjekter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((post) => (
              <div key={post.id} data-hobby={post.hobby}>
                <PostCard
                  hobby={post.hobby as Hobby}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImageUrl={post.coverImageUrl}
                  publishedAt={post.publishedAt}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Om meg */}
      <section className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-serif">
          {settings[SETTING_KEYS.aboutHeading]}
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-line text-foreground/80">
            {settings[SETTING_KEYS.aboutBody]}
          </p>
        </div>
      </section>
    </div>
  );
}
