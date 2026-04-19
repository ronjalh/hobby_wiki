'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { savePost } from '@/app/admin/actions';
import { PostEditor } from '@/components/editor/PostEditor';
import { CoverImageUpload } from '@/components/admin/CoverImageUpload';
import { Button } from '@/components/ui/button';
import { HOBBIES, HOBBY_KEYS, type Hobby } from '@/lib/hobbies';
import { cn } from '@/lib/utils';

type Props = {
  initialId?: string;
  initialHobby?: Hobby;
  initialTitle?: string;
  initialExcerpt?: string;
  initialContent?: string;
  initialCoverImageUrl?: string | null;
  initialPublished?: boolean;
};

export function PostForm({
  initialId,
  initialHobby,
  initialTitle = '',
  initialExcerpt = '',
  initialContent = '',
  initialCoverImageUrl = null,
  initialPublished = false,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [hobby, setHobby] = useState<Hobby | undefined>(initialHobby);
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [content, setContent] = useState(initialContent);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    initialCoverImageUrl,
  );
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(publish: boolean) {
    setError(null);
    if (!hobby) {
      setError('Velg hobby først');
      return;
    }
    if (title.trim().length < 3) {
      setError('Tittel må være minst 3 tegn');
      return;
    }
    if (!content.trim() || content.trim() === '<p></p>') {
      setError('Skriv litt innhold');
      return;
    }

    startTransition(async () => {
      try {
        const result = await savePost({
          id: initialId,
          hobby,
          title: title.trim(),
          excerpt: excerpt.trim() || undefined,
          content,
          coverImageUrl: coverImageUrl ?? undefined,
          published: publish,
        });
        router.push(`/admin/innlegg?saved=${result.slug}`);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Noe gikk galt');
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Hobby-velger */}
      <div>
        <label className="block text-sm font-medium mb-2">Hobby</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {HOBBY_KEYS.map((key) => {
            const config = HOBBIES[key];
            const Icon = config.icon;
            return (
              <HobbyCard
                key={key}
                selected={hobby === key}
                hobbyKey={key}
                label={config.label}
                icon={<Icon className="w-5 h-5" />}
                onClick={() => setHobby(key)}
              />
            );
          })}
        </div>
      </div>

      {/* Tittel */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Tittel
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="F.eks. Mitt første soya-lys"
          className="w-full px-4 py-3 rounded-lg border bg-background text-lg"
        />
      </div>

      {/* Cover-bilde */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Hovedbilde <span className="text-muted-foreground font-normal">(valgfritt)</span>
        </label>
        <CoverImageUpload
          value={coverImageUrl}
          onChange={setCoverImageUrl}
          hobby={hobby}
        />
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
          Utdrag <span className="text-muted-foreground font-normal">(valgfritt, max 300 tegn)</span>
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          maxLength={300}
          rows={2}
          placeholder="Kort beskrivelse som vises i oversikten."
          className="w-full px-4 py-3 rounded-lg border bg-background resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {excerpt.length}/300
        </p>
      </div>

      {/* Editor */}
      <div>
        <label className="block text-sm font-medium mb-2">Innhold</label>
        <PostEditor
          initialContent={initialContent}
          onChange={setContent}
          hobby={hobby}
        />
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 items-center pt-4 border-t">
        <Button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={pending}
        >
          {pending ? 'Lagrer...' : initialPublished ? 'Lagre endringer' : 'Publiser'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit(false)}
          disabled={pending}
        >
          Lagre som utkast
        </Button>
        <Link
          href="/admin"
          className="text-sm text-muted-foreground hover:text-foreground ml-auto"
        >
          Avbryt
        </Link>
      </div>
    </div>
  );
}

function HobbyCard({
  selected,
  hobbyKey,
  label,
  icon,
  onClick,
}: {
  selected: boolean;
  hobbyKey: Hobby;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-hobby={hobbyKey}
      className={cn(
        'flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left transition-all',
        selected
          ? 'border-[var(--color-hobby-accent)] bg-[var(--color-hobby-accent-light)]/30'
          : 'border-border hover:border-[var(--color-hobby-accent)]/50',
      )}
    >
      <span className="text-[var(--color-hobby-accent)]">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}
