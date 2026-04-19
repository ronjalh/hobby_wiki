import Link from 'next/link';
import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts, instagramPosts } from '@/db/schema';
import { SETTING_KEYS } from '@/lib/settings';
import { getAllSettings } from '@/lib/settings-db';
import { FeaturedCarousel } from '@/components/FeaturedCarousel';
import { InstagramEmbeds } from '@/components/InstagramEmbeds';
import { SectionDivider } from '@/components/layout/SectionDivider';

const BG = {
  hero: 'hsl(210, 20%, 99%)',
  featured: 'hsl(210, 25%, 94%)',
  instagram: 'hsl(30, 40%, 97%)',
};

export default async function Home() {
  const [settings, featured, igPosts] = await Promise.all([
    getAllSettings(),
    db.query.posts.findMany({
      where: and(eq(posts.featured, true), eq(posts.published, true)),
      orderBy: desc(posts.publishedAt),
      limit: 12,
    }),
    db.query.instagramPosts.findMany({
      orderBy: asc(instagramPosts.sortOrder),
    }),
  ]);

  const lastColoredBg = igPosts.length > 0
    ? BG.instagram
    : featured.length > 0
      ? BG.featured
      : BG.hero;

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
                className="rounded-2xl border border-neutral-200 bg-background px-10 py-6 text-center transition-colors hover:bg-neutral-50"
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

      {/* Fremhevede innlegg */}
      {featured.length > 0 && (
        <>
          <SectionDivider
            fromColor={BG.hero}
            toColor={BG.featured}
            variant="gentle"
          />
          <section style={{ background: BG.featured }}>
            <div className="container mx-auto max-w-5xl px-4 py-10">
              <h2 className="text-3xl font-serif text-center mb-8">
                Fremhevede prosjekter
              </h2>
              <FeaturedCarousel
                posts={featured.map((p) => ({
                  id: p.id,
                  hobby: p.hobby,
                  slug: p.slug,
                  title: p.title,
                  excerpt: p.excerpt,
                  coverImageUrl: p.coverImageUrl,
                  publishedAt: p.publishedAt,
                }))}
              />
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

      {/* Liten bølge før Om meg — går fra siste fargede seksjon til hvit */}
      {(featured.length > 0 || igPosts.length > 0) && (
        <SectionDivider
          fromColor={lastColoredBg}
          toColor={BG.hero}
          variant="gentle"
        />
      )}

      {/* Om meg — arver sidens default bakgrunn */}
      <section>
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
