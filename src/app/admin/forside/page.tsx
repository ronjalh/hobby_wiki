import { and, desc, eq, or } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { getAllSettings } from '@/lib/settings-db';
import { ForsideSettingsForm } from '@/components/admin/ForsideSettingsForm';
import { FeaturedPostsPicker } from '@/components/admin/FeaturedPostsPicker';

export default async function ForsideAdminPage() {
  const settings = await getAllSettings();

  const candidates = await db.query.posts.findMany({
    where: or(eq(posts.published, true), eq(posts.featured, true)),
    orderBy: desc(posts.publishedAt),
  });

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-serif">Forside</h2>
        <p className="text-muted-foreground mt-1">
          Rediger tekst og velg hvilke innlegg som skal fremheves på
          forsiden.
        </p>
      </div>

      <section className="space-y-4">
        <h3 className="font-serif text-xl">Tekst</h3>
        <ForsideSettingsForm initial={settings} />
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-xl">Fremhevede innlegg</h3>
        <p className="text-sm text-muted-foreground">
          Velg inntil 3–6 innlegg som vises på forsiden. Kun publiserte innlegg
          kan fremheves.
        </p>
        <FeaturedPostsPicker posts={candidates} />
      </section>
    </div>
  );
}
