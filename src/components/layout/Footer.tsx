'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  const hobby = pathname.startsWith('/lys')
    ? 'lys'
    : pathname.startsWith('/smykker')
      ? 'smykker'
      : null;

  const otherHobby = hobby === 'lys' ? 'smykker' : hobby === 'smykker' ? 'lys' : null;

  return (
    <footer className="border-t border-[var(--color-hobby-accent-light)]/30 mt-16">
      <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 · Ronja</p>

        {otherHobby && (
          <Link
            href={`/${otherHobby}`}
            className="hover:text-[var(--color-hobby-accent)] transition-colors"
          >
            → Besøk {otherHobby === 'lys' ? 'lys-verdenen' : 'smykke-verdenen'}
          </Link>
        )}

        <Link href="/start" className="hover:text-foreground transition-colors">
          Velg verden
        </Link>
      </div>
    </footer>
  );
}
