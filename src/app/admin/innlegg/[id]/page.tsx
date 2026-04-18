import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { PostForm } from '@/components/admin/PostForm';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RedigerInnleggPage({ params }: Props) {
  const { id } = await params;

  const post = await db.query.posts.findFirst({
    where: eq(posts.id, id),
  });

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif">Rediger innlegg</h2>
        <p className="text-muted-foreground mt-1">
          {post.published ? 'Publisert' : 'Utkast'} ·{' '}
          {new Date(post.updatedAt).toLocaleDateString('nb-NO')}
        </p>
      </div>
      <PostForm
        initialId={post.id}
        initialHobby={post.hobby as 'lys' | 'smykker'}
        initialTitle={post.title}
        initialExcerpt={post.excerpt ?? ''}
        initialContent={post.content}
        initialPublished={post.published}
      />
    </div>
  );
}
