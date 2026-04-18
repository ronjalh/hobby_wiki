import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { Plus, FileText, Flame, Gem } from 'lucide-react';
import { db } from '@/db';
import { posts } from '@/db/schema';

export default async function AdminDashboard() {
  const [totalCount, lysCount, smykkerCount, publishedCount, recent] =
    await Promise.all([
      db.$count(posts),
      db.$count(posts, eq(posts.hobby, 'lys')),
      db.$count(posts, eq(posts.hobby, 'smykker')),
      db.$count(posts, eq(posts.published, true)),
      db.query.posts.findMany({
        orderBy: desc(posts.updatedAt),
        limit: 5,
      }),
    ]);

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-serif mb-1">Dashboard</h2>
        <p className="text-muted-foreground">Oversikt og hurtigtilganger</p>
      </div>

      {/* Statistikk */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat label="Totalt" value={totalCount} />
        <Stat label="Publiserte" value={publishedCount} />
        <Stat label="Lys" value={lysCount} icon={<Flame className="w-4 h-4" />} />
        <Stat label="Smykker" value={smykkerCount} icon={<Gem className="w-4 h-4" />} />
      </div>

      {/* Hurtigtilganger */}
      <div className="grid sm:grid-cols-2 gap-3">
        <Link
          href="/admin/ny?hobby=lys"
          data-hobby="lys"
          className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-[var(--color-hobby-accent)]/30 hover:border-[var(--color-hobby-accent)] hover:bg-[var(--color-hobby-accent-light)]/20 transition-all"
        >
          <Plus className="w-5 h-5 text-[var(--color-hobby-accent)]" />
          <div>
            <p className="font-medium">Nytt lys-innlegg</p>
            <p className="text-sm text-muted-foreground">
              Opprett nytt innhold
            </p>
          </div>
        </Link>

        <Link
          href="/admin/ny?hobby=smykker"
          data-hobby="smykker"
          className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-[var(--color-hobby-accent)]/30 hover:border-[var(--color-hobby-accent)] hover:bg-[var(--color-hobby-accent-light)]/20 transition-all"
        >
          <Plus className="w-5 h-5 text-[var(--color-hobby-accent)]" />
          <div>
            <p className="font-medium">Nytt smykke-innlegg</p>
            <p className="text-sm text-muted-foreground">
              Opprett nytt innhold
            </p>
          </div>
        </Link>
      </div>

      {/* Nylige innlegg */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif">Nylige innlegg</h3>
          <Link
            href="/admin/innlegg"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Se alle →
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="rounded-xl border border-dashed px-6 py-12 text-center">
            <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              Ingen innlegg ennå. Klikk en av knappene over for å starte.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recent.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/admin/innlegg/${post.id}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground shrink-0">
                      {post.hobby}
                    </span>
                    <span className="font-medium truncate">{post.title}</span>
                    {!post.published && (
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                        Utkast
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground ml-4 shrink-0">
                    {new Date(post.updatedAt).toLocaleDateString('nb-NO')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border px-5 py-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-3xl font-serif mt-1">{value}</p>
    </div>
  );
}
