import type { Metadata } from 'next';
import Link from 'next/link';
import { HOBBIES, HOBBY_KEYS } from '@/lib/hobbies';

export const metadata: Metadata = {
  title: 'Velg verden',
  description: 'Velg mellom lysstøping, smykkelaging og håndarbeid.',
};

const BUTTON_IMAGES: Record<string, string> = {
  lys: '/lys-button.png',
  smykker: '/smykker-button.png',
  handarbeid: '/handarbeid-button.png',
};

export default function StartPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center space-y-12 max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Velg din verden
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-end justify-items-center">
          {HOBBY_KEYS.map((key) => {
            const config = HOBBIES[key];
            return (
              <Link
                key={key}
                href={`/${key}`}
                data-hobby={key}
                aria-label={config.label}
                className="group flex flex-col items-center gap-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={BUTTON_IMAGES[key]}
                  alt=""
                  aria-hidden="true"
                  className="w-48 h-48 md:w-56 md:h-56 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-2deg] drop-shadow-md"
                />
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-hobby-accent-dark)] group-hover:text-[var(--color-hobby-accent)] transition-colors">
                    {config.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
