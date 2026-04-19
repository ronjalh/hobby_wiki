import Link from 'next/link';
import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts, instagramPosts } from '@/db/schema';
import { SETTING_KEYS } from '@/lib/settings';
import { getAllSettings } from '@/lib/settings-db';
import { HighlightedPolaroid } from '@/components/post/HighlightedPolaroid';
import { InstagramEmbeds } from '@/components/InstagramEmbeds';
import { SectionDivider } from '@/components/layout/SectionDivider';
import type { Hobby } from '@/lib/hobbies';

const BG = {
  hero: 'hsl(340, 40%, 98%)',
  featured: 'hsl(340, 30%, 94%)',
  instagram: 'hsl(30, 40%, 97%)',
  about: 'hsl(40, 40%, 96%)',
};

export default async function Home() {
  const [settings, featured, igPosts] = await Promise.all([
    getAllSettings(),
    db.query.posts.findMany({
      where: and(eq(posts.featured, true), eq(posts.published, true)),
      orderBy: desc(posts.publishedAt),
      limit: 3,
    }),
    db.query.instagramPosts.findMany({
      orderBy: asc(instagramPosts.sortOrder),
    }),
  ]);

  // Rotasjoner for de 3 highlights (tilfeldig følelse)
  const ROTATIONS = [-3, 2, -1.5];

  return (
    <div>
      {/* Hero */}
      <section style={{ background: BG.hero }}>
        <div className="container mx-auto max-w-5xl px-4 pt-20 pb-24">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif">
              {settings[SETTING_KEYS.heroTitle]}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
              {settings[SETTING_KEYS.heroSubtitle]}
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                href="/start"
                className="rounded-2xl border-2 border-[var(--color-hobby-accent-light)] bg-white px-10 py-6 text-center transition-all hover:border-[var(--color-hobby-accent)] hover:bg-[var(--color-hobby-accent-light)]/30 hover:-translate-y-0.5"
              >
                <p className="font-serif text-xl mb-1">Start eventyret</p>
                <p className="text-sm text-muted-foreground">
                  Velg en verden å utforske
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fremhevede prosjekter */}
      {featured.length > 0 && (
        <>
          <SectionDivider
            fromColor={BG.hero}
            toColor={BG.featured}
            variant="gentle"
          />
          <section style={{ background: BG.featured }}>
            <div className="container mx-auto max-w-5xl px-4 py-12">
              <h2 className="text-3xl font-serif text-center mb-10">
                Fremhevede prosjekter
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start justify-items-center pt-6">
                {featured.map((post, i) => (
                  <div key={post.id} data-hobby={post.hobby}>
                    <HighlightedPolaroid
                      hobby={post.hobby as Hobby}
                      slug={post.slug}
                      title={post.title}
                      coverImageUrl={post.coverImageUrl}
                      publishedAt={post.publishedAt}
                      rotation={ROTATIONS[i] ?? 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Instagram */}
      {igPosts.length > 0 && (
        <>
          <SectionDivider
            fromColor={featured.length > 0 ? BG.featured : BG.hero}
            toColor={BG.instagram}
            variant="wavy"
          />
          <section style={{ background: BG.instagram }}>
            <div className="container mx-auto max-w-5xl px-4 py-16">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif">Fra Instagram</h2>
                <a
                  href="https://instagram.com/lem_designz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  @lem_designz →
                </a>
              </div>
              <InstagramEmbeds
                posts={igPosts.map((p) => ({
                  id: p.id,
                  embedHtml: p.embedHtml,
                }))}
              />
            </div>
          </section>
        </>
      )}

      {/* Om meg */}
      <SectionDivider
        fromColor={
          igPosts.length > 0
            ? BG.instagram
            : featured.length > 0
              ? BG.featured
              : BG.hero
        }
        toColor={BG.about}
        variant="gentle"
      />
      <section style={{ background: BG.about }}>
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-3xl font-serif mb-6">
            {settings[SETTING_KEYS.aboutHeading]}
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-line text-foreground/80">
              {settings[SETTING_KEYS.aboutBody]}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
