'use client';

import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star } from 'lucide-react';
import { toggleFeatured } from '@/app/admin/forside/actions';
import { HOBBIES } from '@/lib/hobbies';
import { cn } from '@/lib/utils';

type PostItem = {
  id: string;
  title: string;
  hobby: string;
  published: boolean;
  featured: boolean;
};

export function FeaturedPostsPicker({ posts }: { posts: PostItem[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle(postId: string) {
    setError(null);
    startTransition(async () => {
      try {
        await toggleFeatured(postId);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Noe gikk galt');
      }
    });
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed px-6 py-12 text-center text-muted-foreground">
        Ingen publiserte innlegg ennå. Opprett og publiser noen først.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-900"
        >
          {error}
        </div>
      )}
      <ul className="space-y-1">
        {posts.map((post) => {
          const hobbyKey = post.hobby as keyof typeof HOBBIES;
          const hobbyLabel = HOBBIES[hobbyKey]?.label ?? post.hobby;
          return (
            <li key={post.id}>
              <button
                type="button"
                onClick={() => handleToggle(post.id)}
                disabled={pending}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left',
                  post.featured
                    ? 'border-[var(--color-hobby-accent)] bg-[var(--color-hobby-accent-light)]/20'
                    : 'hover:bg-muted',
                  pending && 'opacity-50',
                )}
              >
                <Star
                  className={cn(
                    'w-5 h-5 shrink-0 transition-colors',
                    post.featured
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-muted-foreground',
                  )}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {hobbyLabel}
                  </p>
                </div>
                {!post.published && (
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                    Utkast
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
