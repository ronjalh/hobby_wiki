'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type Props = {
  fallbackHref: string;
  fallbackLabel: string;
};

export function BackButton({ fallbackHref, fallbackLabel }: Props) {
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  }

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      <span>Tilbake til {fallbackLabel}</span>
    </a>
  );
}
