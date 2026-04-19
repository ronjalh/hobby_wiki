'use client';

import { usePathname } from 'next/navigation';
import { HOBBY_KEYS, type Hobby } from '@/lib/hobbies';

type Context = Hobby | 'admin' | null;

function detectContext(pathname: string): Context {
  if (pathname.startsWith('/admin')) return 'admin';
  for (const key of HOBBY_KEYS) {
    if (pathname.startsWith(`/${key}`)) return key;
  }
  return null;
}

const PALETTES: Record<
  string,
  { light: string; medium: string; dark: string }
> = {
  lys: {
    light: 'hsl(270, 80%, 85%)',
    medium: 'hsl(270, 70%, 65%)',
    dark: 'hsl(270, 55%, 35%)',
  },
  smykker: {
    light: 'hsl(180, 70%, 82%)',
    medium: 'hsl(180, 60%, 55%)',
    dark: 'hsl(180, 55%, 32%)',
  },
  handarbeid: {
    light: 'hsl(100, 30%, 82%)',
    medium: 'hsl(100, 26%, 55%)',
    dark: 'hsl(100, 30%, 32%)',
  },
  neutral: {
    light: 'hsl(340, 40%, 90%)',
    medium: 'hsl(340, 35%, 72%)',
    dark: 'hsl(340, 40%, 48%)',
  },
  admin: {
    light: 'hsl(210, 25%, 85%)',
    medium: 'hsl(210, 20%, 55%)',
    dark: 'hsl(210, 25%, 30%)',
  },
};

// Bakgrunn av SVG-containeren — skal matche body-default
const BG_TOP: Record<string, string> = {
  lys: 'hsl(270, 30%, 98%)',
  smykker: 'hsl(180, 25%, 98%)',
  handarbeid: 'hsl(100, 20%, 97%)',
  admin: 'hsl(210, 20%, 99%)',
  neutral: 'hsl(340, 40%, 98%)',
};

export function WaveTransition() {
  const pathname = usePathname();
  const context = detectContext(pathname);
  const paletteKey = context ?? 'neutral';
  const colors = PALETTES[paletteKey];

  const topBg = BG_TOP[paletteKey];

  return (
    <div
      className="relative w-full"
      style={{ background: topBg }}
      aria-hidden="true"
    >
      <svg
        className="block w-full"
        viewBox="0 0 1200 240"
        preserveAspectRatio="none"
        style={{ height: '140px', marginBottom: '-1px' }}
      >
        {/* Lyseste — bakerst, peek øverst */}
        <path
          d="M0,50 C180,90 380,10 600,45 C820,85 1020,20 1200,55 L1200,240 L0,240 Z"
          fill={colors.light}
        />
        {/* Midtre — i midten */}
        <path
          d="M0,110 C150,75 380,150 600,115 C820,75 1050,155 1200,120 L1200,240 L0,240 Z"
          fill={colors.medium}
        />
        {/* Mørkeste — fremst, nederst, kobles til footer */}
        <path
          d="M0,170 C200,140 420,195 600,165 C780,135 1000,195 1200,170 L1200,240 L0,240 Z"
          fill={colors.dark}
        />
      </svg>
    </div>
  );
}
