import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { PostRowActions } from '@/components/admin/PostRowActions';
import type { Hobby } from '@/lib/hobbies';

type Props = {
  searchParams: Promise<{ saved?: string }>;
};

export default async function AdminInnleggPage({ searchParams }: Props) {
  const { saved } = await searchParams;

  const allPosts = await db.query.posts.findMany({
    orderBy: desc(posts.updatedAt),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-3xl font-serif">Innlegg</h2>
          <p className="text-muted-foreground mt-1">
            {allPosts.length} totalt
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/ny?hobby=lys"
            className="px-4 py-2 rounded-md text-sm border hover:bg-muted"
          >
            + Nytt lys-innlegg
          </Link>
          <Link
            href="/admin/ny?hobby=smykker"
            className="px-4 py-2 rounded-md text-sm border hover:bg-muted"
          >
            + Nytt smykke-innlegg
          </Link>
        </div>
      </div>

      {saved && (
        <div
          role="status"
          className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-900"
        >
          ✓ Innlegget &quot;{saved}&quot; ble lagret.
        </div>
      )}

      {allPosts.length === 0 ? (
        <div className="rounded-xl border border-dashed px-6 py-12 text-center text-muted-foreground">
          Ingen innlegg ennå.
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">Tittel</th>
                <th className="px-4 py-3 font-medium w-24">Hobby</th>
                <th className="px-4 py-3 font-medium w-28">Status</th>
                <th className="px-4 py-3 font-medium w-32">Oppdatert</th>
                <th className="px-4 py-3 font-medium w-40 text-right">
                  Handlinger
                </th>
              </tr>
            </thead>
            <tbody>
              {allPosts.map((post) => (
                <tr key={post.id} className="border-t">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/innlegg/${post.id}`}
                      className="font-medium hover:underline"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {post.hobby}
                  </td>
                  <td className="px-4 py-3">
                    {post.published ? (
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-900">
                        Publisert
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-900">
                        Utkast
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(post.updatedAt).toLocaleDateString('nb-NO')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <PostRowActions
                      postId={post.id}
                      hobby={post.hobby as Hobby}
                      slug={post.slug}
                      published={post.published}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
