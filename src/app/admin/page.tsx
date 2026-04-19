import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { Plus, FileText } from 'lucide-react';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { HOBBIES, HOBBY_KEYS } from '@/lib/hobbies';

export default async function AdminDashboard() {
  const [totalCount, publishedCount, recent, ...hobbyCounts] =
    await Promise.all([
      db.$count(posts),
      db.$count(posts, eq(posts.published, true)),
      db.query.posts.findMany({
        orderBy: desc(posts.updatedAt),
        limit: 5,
      }),
      ...HOBBY_KEYS.map((key) => db.$count(posts, eq(posts.hobby, key))),
    ]);

  const countByHobby = Object.fromEntries(
    HOBBY_KEYS.map((key, i) => [key, hobbyCounts[i]]),
  ) as Record<(typeof HOBBY_KEYS)[number], number>;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-serif mb-1">Dashboard</h2>
        <p className="text-muted-foreground">Oversikt og hurtigtilganger</p>
      </div>

      {/* Statistikk */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Stat label="Totalt" value={totalCount} />
        <Stat label="Publiserte" value={publishedCount} />
        {HOBBY_KEYS.map((key) => {
          const config = HOBBIES[key];
          const Icon = config.icon;
          return (
            <Stat
              key={key}
              label={config.label}
              value={countByHobby[key]}
              icon={<Icon className="w-4 h-4" />}
            />
          );
        })}
      </div>

      {/* Hurtigtilganger */}
      <div className="grid sm:grid-cols-3 gap-3">
        {HOBBY_KEYS.map((key) => {
          const config = HOBBIES[key];
          return (
            <Link
              key={key}
              href={`/admin/ny?hobby=${key}`}
              data-hobby={key}
              className="flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-[var(--color-hobby-accent)]/30 hover:border-[var(--color-hobby-accent)] hover:bg-[var(--color-hobby-accent-light)]/20 transition-all"
            >
              <Plus className="w-5 h-5 text-[var(--color-hobby-accent)]" />
              <div>
                <p className="font-medium">Nytt {config.label.toLowerCase()}-innlegg</p>
                <p className="text-sm text-muted-foreground">
                  Opprett nytt innhold
                </p>
              </div>
            </Link>
          );
        })}
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
