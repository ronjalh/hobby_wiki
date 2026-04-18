'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost, togglePublish } from '@/app/admin/actions';
import { Button } from '@/components/ui/button';

type Props = {
  postId: string;
  hobby: 'lys' | 'smykker';
  slug: string;
  published: boolean;
};

export function PostRowActions({ postId, hobby, slug, published }: Props) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm('Slett dette innlegget? Handlingen kan ikke angres.')) return;
    startTransition(async () => {
      await deletePost(postId);
      router.refresh();
    });
  }

  function handleToggle() {
    startTransition(async () => {
      await togglePublish(postId);
      router.refresh();
    });
  }

  return (
    <div className="flex gap-1 justify-end">
      {published && (
        <Link
          href={`/${hobby}/${slug}`}
          target="_blank"
          className="px-2 py-1 text-xs rounded hover:bg-muted text-muted-foreground"
        >
          Vis
        </Link>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        disabled={pending}
      >
        {published ? 'Avpubliser' : 'Publiser'}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        disabled={pending}
        className="text-destructive hover:text-destructive"
      >
        Slett
      </Button>
    </div>
  );
}
