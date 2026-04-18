'use client';

import { useState, useRef, useTransition } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '@/app/admin/upload-actions';
import { cn } from '@/lib/utils';

type Props = {
  value: string | null;
  onChange: (url: string | null) => void;
  hobby: 'lys' | 'smykker' | undefined;
};

export function CoverImageUpload({ value, onChange, hobby }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', hobby ?? 'misc');
        const result = await uploadImage(formData);
        onChange(result.url);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Opplasting feilet');
      }
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  if (value) {
    return (
      <div className="relative rounded-xl overflow-hidden border group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value}
          alt="Cover"
          className="w-full h-64 object-cover"
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
          aria-label="Fjern bilde"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-2 py-12 px-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
          dragOver
            ? 'border-[var(--color-hobby-accent)] bg-[var(--color-hobby-accent-light)]/20'
            : 'border-border hover:border-[var(--color-hobby-accent)]/50 hover:bg-muted/50',
          pending && 'pointer-events-none opacity-60',
        )}
      >
        {pending ? (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Laster opp...</p>
          </>
        ) : (
          <>
            <Upload className="w-8 h-8 text-muted-foreground" />
            <p className="text-sm font-medium">
              Dra bildet hit eller klikk for å velge
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WebP eller GIF · Maks 15 MB
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleInputChange}
          disabled={pending}
          className="sr-only"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-destructive mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
