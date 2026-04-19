'use client';

import { usePathname } from 'next/navigation';
import { HOBBY_KEYS, type Hobby } from '@/lib/hobbies';

function detectHobby(pathname: string): Hobby | null {
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
    light: 'hsl(340, 85%, 87%)',
    medium: 'hsl(340, 75%, 68%)',
    dark: 'hsl(340, 60%, 38%)',
  },
  neutral: {
    light: 'hsl(210, 25%, 85%)',
    medium: 'hsl(210, 20%, 55%)',
    dark: 'hsl(210, 25%, 30%)',
  },
};

export function WaveTransition() {
  const pathname = usePathname();
  const hobby = detectHobby(pathname);
  const colors = PALETTES[hobby ?? 'neutral'];

  return (
    <div className="relative w-full" aria-hidden="true">
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
