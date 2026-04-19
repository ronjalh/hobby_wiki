import { asc, desc, eq, or } from 'drizzle-orm';
import { db } from '@/db';
import { posts, instagramPosts } from '@/db/schema';
import { getAllSettings } from '@/lib/settings-db';
import { ForsideSettingsForm } from '@/components/admin/ForsideSettingsForm';
import { FeaturedPostsPicker } from '@/components/admin/FeaturedPostsPicker';
import { InstagramPostsManager } from '@/components/admin/InstagramPostsManager';

export default async function ForsideAdminPage() {
  const [settings, candidates, igPosts] = await Promise.all([
    getAllSettings(),
    db.query.posts.findMany({
      where: or(eq(posts.published, true), eq(posts.featured, true)),
      orderBy: desc(posts.publishedAt),
    }),
    db.query.instagramPosts.findMany({
      orderBy: asc(instagramPosts.sortOrder),
    }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-serif">Forside</h2>
        <p className="text-muted-foreground mt-1">
          Rediger tekst, velg fremhevede innlegg og legg til Instagram-innlegg.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-serif text-xl">Tekst</h3>
        <ForsideSettingsForm initial={settings} />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl">Fremhevede innlegg</h3>
        <p className="text-sm text-muted-foreground">
          Velg innlegg som vises på forsiden. Kun publiserte innlegg kan
          fremheves.
        </p>
        <FeaturedPostsPicker posts={candidates} />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl">Fra Instagram</h3>
        <p className="text-sm text-muted-foreground">
          Vis utvalgte Instagram-innlegg fra{' '}
          <a
            href="https://instagram.com/lem_designz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            @lem_designz
          </a>{' '}
          på forsiden. Lim inn embed-kode for hvert innlegg.
        </p>
        <InstagramPostsManager posts={igPosts} />
      </section>
    </div>
  );
}
