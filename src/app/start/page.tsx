import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Velg verden',
  description: 'Velg mellom lysstøping og smykkelaging.',
};

export default function StartPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center space-y-12 max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Velg din verden
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <Link
            href="/lys"
            data-hobby="lys"
            className="group relative block aspect-[3/4] rounded-3xl overflow-hidden border border-[var(--color-hobby-accent)]/25 bg-[var(--color-hobby-accent-light)]/15 hover:border-[var(--color-hobby-accent)]/60 hover:bg-[var(--color-hobby-accent-light)]/25 transition-all duration-500 hover:scale-[1.03]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4">🕯️</div>
              <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-hobby-accent-dark)]">
                Lysstøping
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Voks, duft og flammer
              </p>
            </div>
          </Link>

          <Link
            href="/smykker"
            data-hobby="smykker"
            className="group relative block aspect-[3/4] rounded-3xl overflow-hidden border border-[var(--color-hobby-accent)]/25 bg-[var(--color-hobby-accent-light)]/15 hover:border-[var(--color-hobby-accent)]/60 hover:bg-[var(--color-hobby-accent-light)]/25 transition-all duration-500 hover:scale-[1.03]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4">💎</div>
              <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-hobby-accent-dark)]">
                Smykkelaging
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Sølv, perler og stein
              </p>
            </div>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground italic">
          (Fullverdig pill-animasjon kommer i Fase 6)
        </p>
      </div>
    </div>
  );
}
