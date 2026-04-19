'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Instagram } from 'lucide-react';
import { HOBBIES, HOBBY_KEYS, type Hobby } from '@/lib/hobbies';

function detectHobby(pathname: string): Hobby | null {
  for (const key of HOBBY_KEYS) {
    if (pathname.startsWith(`/${key}`)) return key;
  }
  return null;
}

const FOOTER_COLORS: Record<string, string> = {
  lys: 'hsl(270, 55%, 35%)',
  smykker: 'hsl(180, 55%, 32%)',
  handarbeid: 'hsl(340, 60%, 38%)',
  neutral: 'hsl(210, 25%, 30%)',
};

export function Footer() {
  const pathname = usePathname();
  const hobby = detectHobby(pathname);
  const bg = FOOTER_COLORS[hobby ?? 'neutral'];
  const others = hobby ? HOBBY_KEYS.filter((k) => k !== hobby) : [];

  return (
    <footer
      style={{ background: bg }}
      className="text-white/90"
    >
      <div className="container mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-4">
          <p className="text-white/75">© 2026 · Ronja</p>
          <a
            href="https://instagram.com/lem_designz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram: lem_designz"
            className="text-white/80 hover:text-white transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {hobby && (
          <div className="flex flex-wrap gap-5 items-center justify-center">
            {others.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="hover:text-white transition-colors"
              >
                → {HOBBIES[key].label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
