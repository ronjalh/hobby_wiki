'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import {
  addInstagramPost,
  deleteInstagramPost,
} from '@/app/admin/forside/actions';
import { Button } from '@/components/ui/button';

type IgPost = {
  id: string;
  embedHtml: string;
  sortOrder: number;
};

export function InstagramPostsManager({ posts }: { posts: IgPost[] }) {
  const router = useRouter();
  const [embed, setEmbed] = useState('');
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAdd() {
    setError(null);
    if (!embed.trim()) {
      setError('Lim inn embed-koden først');
      return;
    }
    startTransition(async () => {
      try {
        await addInstagramPost(embed);
        setEmbed('');
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Noe gikk galt');
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm('Fjerne dette Instagram-innlegget fra forsiden?')) return;
    startTransition(async () => {
      await deleteInstagramPost(id);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4 space-y-3">
        <div>
          <label
            htmlFor="ig-embed"
            className="block text-sm font-medium mb-1"
          >
            Legg til Instagram-innlegg
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            På Instagram: klikk «...» på innlegget → velg <strong>Embed</strong>{' '}
            → kopier hele HTML-blokken → lim inn her.
          </p>
          <textarea
            id="ig-embed"
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
            rows={5}
            placeholder='<blockquote class="instagram-media" data-instgrm-permalink="..." ...>...</blockquote>'
            className="w-full px-3 py-2 rounded-lg border bg-background font-mono text-xs resize-y"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" onClick={handleAdd} disabled={pending}>
            {pending ? 'Legger til...' : 'Legg til'}
          </Button>
          {error && (
            <span role="alert" className="text-sm text-destructive">
              {error}
            </span>
          )}
        </div>
      </div>

      {posts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">
            Nåværende ({posts.length})
          </h4>
          <ul className="space-y-2">
            {posts.map((post, i) => (
              <li
                key={post.id}
                className="flex items-start gap-3 rounded-lg border px-4 py-3"
              >
                <span className="text-xs font-medium text-muted-foreground mt-1 w-6 shrink-0">
                  #{i + 1}
                </span>
                <code className="flex-1 text-xs text-muted-foreground font-mono break-all line-clamp-2">
                  {post.embedHtml.slice(0, 120)}...
                </code>
                <button
                  type="button"
                  onClick={() => handleDelete(post.id)}
                  disabled={pending}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                  aria-label="Slett"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
