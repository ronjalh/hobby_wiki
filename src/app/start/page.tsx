import type { Metadata } from 'next';
import Link from 'next/link';
import { HOBBIES, HOBBY_KEYS } from '@/lib/hobbies';

export const metadata: Metadata = {
  title: 'Velg verden',
  description: 'Velg mellom lysstøping, smykkelaging og håndarbeid.',
};

export default function StartPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center space-y-12 max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Velg din verden
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {HOBBY_KEYS.map((key) => {
            const config = HOBBIES[key];
            return (
              <Link
                key={key}
                href={`/${key}`}
                data-hobby={key}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden border border-[var(--color-hobby-accent)]/25 bg-[var(--color-hobby-accent-light)]/15 hover:border-[var(--color-hobby-accent)]/60 hover:bg-[var(--color-hobby-accent-light)]/25 transition-all duration-500 hover:scale-[1.03]"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="text-6xl mb-4">{config.emoji}</div>
                  <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-hobby-accent-dark)]">
                    {config.label}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-xs text-muted-foreground italic">
          (Fullverdig pill-animasjon kommer i Fase 6)
        </p>
      </div>
    </div>
  );
}
