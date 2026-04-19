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
    <div className="relative w-full mt-16" aria-hidden="true">
      {/* Lyseste lag — lengst opp */}
      <svg
        className="block w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: '70px', marginBottom: '-40px' }}
      >
        <path
          d="M0,50 C180,90 380,10 600,45 C820,80 1020,20 1200,55 L1200,120 L0,120 Z"
          fill={colors.light}
          opacity="0.9"
        />
      </svg>
      {/* Midtre lag */}
      <svg
        className="block w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: '80px', marginBottom: '-40px' }}
      >
        <path
          d="M0,65 C150,25 380,100 600,60 C820,20 1050,95 1200,55 L1200,120 L0,120 Z"
          fill={colors.medium}
          opacity="0.95"
        />
      </svg>
      {/* Mørkeste lag — kobler til footer */}
      <svg
        className="block w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ height: '70px', marginBottom: '-1px' }}
      >
        <path
          d="M0,80 C200,55 420,105 600,75 C780,45 1000,105 1200,80 L1200,120 L0,120 Z"
          fill={colors.dark}
        />
      </svg>
    </div>
  );
}
