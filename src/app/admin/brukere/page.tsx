import Image from 'next/image';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/db';
import { users, posts } from '@/db/schema';
import { auth } from '@/lib/auth/config';
import { UserRowActions } from '@/components/admin/UserRowActions';

export default async function BrukerePage() {
  const session = await auth();
  const currentUserId = session?.user?.id;

  const allUsers = await db.query.users.findMany({
    orderBy: desc(users.createdAt),
  });

  // Tell antall innlegg per bruker
  const postsByAuthor = await db
    .select({ authorId: posts.authorId })
    .from(posts);
  const postCounts = postsByAuthor.reduce<Record<string, number>>(
    (acc, { authorId }) => {
      acc[authorId] = (acc[authorId] ?? 0) + 1;
      return acc;
    },
    {},
  );

  const adminCount = allUsers.filter((u) => u.role === 'admin').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif">Brukere</h2>
        <p className="text-muted-foreground mt-1">
          {allUsers.length} totalt · {adminCount} administrator
          {adminCount !== 1 && 'er'}
        </p>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Bruker</th>
              <th className="px-4 py-3 font-medium w-32">Rolle</th>
              <th className="px-4 py-3 font-medium w-24">Innlegg</th>
              <th className="px-4 py-3 font-medium w-32">Opprettet</th>
              <th className="px-4 py-3 font-medium w-48 text-right">
                Handlinger
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => {
              const isCurrent = user.id === currentUserId;
              const postCount = postCounts[user.id] ?? 0;
              return (
                <tr key={user.id} className="border-t">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt=""
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                          {(user.name ?? user.email ?? '?').charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        {user.name && (
                          <p className="font-medium truncate">{user.name}</p>
                        )}
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                      {isCurrent && (
                        <span className="text-xs text-muted-foreground italic">
                          (deg)
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {user.role === 'admin' ? (
                      <span className="text-xs px-2 py-1 rounded bg-[var(--color-hobby-accent-light)]/40 text-[var(--color-hobby-accent-dark)]">
                        Admin
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                        Bruker
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {postCount}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString('nb-NO')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <UserRowActions
                      userId={user.id}
                      userEmail={user.email}
                      userRole={user.role as 'admin' | 'user'}
                      isCurrentUser={isCurrent}
                      postCount={postCount}
                      isLastAdmin={user.role === 'admin' && adminCount === 1}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
