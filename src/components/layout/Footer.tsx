'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HOBBIES, HOBBY_KEYS, type Hobby } from '@/lib/hobbies';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

type Context = Hobby | 'admin' | null;

function detectContext(pathname: string): Context {
  if (pathname.startsWith('/admin')) return 'admin';
  for (const key of HOBBY_KEYS) {
    if (pathname.startsWith(`/${key}`)) return key;
  }
  return null;
}

const FOOTER_COLORS: Record<string, string> = {
  lys: 'hsl(270, 55%, 35%)',
  smykker: 'hsl(180, 55%, 32%)',
  handarbeid: 'hsl(100, 30%, 32%)',
  admin: 'hsl(210, 25%, 30%)',
  neutral: 'hsl(340, 40%, 48%)',
};

export function Footer() {
  const pathname = usePathname();
  const context = detectContext(pathname);
  const bg = FOOTER_COLORS[context ?? 'neutral'];
  const hobby = context && context !== 'admin' ? context : null;
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
            <InstagramIcon className="w-5 h-5" />
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
