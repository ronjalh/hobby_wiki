import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function AdminDashboard() {
  const [totalCount, lysCount, smykkerCount] = await Promise.all([
    db.$count(posts),
    db.$count(posts, eq(posts.hobby, 'lys')),
    db.$count(posts, eq(posts.hobby, 'smykker')),
  ]);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-serif">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Totalt innlegg</p>
          <p className="text-4xl font-serif mt-2">{totalCount}</p>
        </div>
        <div className="border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Lysstøping</p>
          <p className="text-4xl font-serif mt-2">{lysCount}</p>
        </div>
        <div className="border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">Smykkelaging</p>
          <p className="text-4xl font-serif mt-2">{smykkerCount}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        Fase 1 komplett: auth fungerer. Neste fase legger til &quot;Nytt innlegg&quot;-knapp og editor.
      </p>
    </div>
  );
}
