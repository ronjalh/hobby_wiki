'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HOBBIES, HOBBY_KEYS, type Hobby } from '@/lib/hobbies';

function detectHobby(pathname: string): Hobby | null {
  for (const key of HOBBY_KEYS) {
    if (pathname.startsWith(`/${key}`)) return key;
  }
  return null;
}

export function Footer() {
  const pathname = usePathname();
  const hobby = detectHobby(pathname);
  const others = hobby ? HOBBY_KEYS.filter((k) => k !== hobby) : [];

  return (
    <footer className="border-t border-[var(--color-hobby-accent-light)]/30 mt-16">
      <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 · Ronja</p>

        {hobby && (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {others.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                data-hobby={key}
                className="hover:text-[var(--color-hobby-accent)] transition-colors"
              >
                → {HOBBIES[key].label}
              </Link>
            ))}
          </div>
        )}

        <Link href="/start" className="hover:text-foreground transition-colors">
          Velg verden
        </Link>
      </div>
    </footer>
  );
}
