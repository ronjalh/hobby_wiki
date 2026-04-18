import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Velg verden',
  description: 'Velg mellom lysstøping og smykkelaging.',
};

export default function StartPage() {
  return (
    <div
      className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-16 mx-4 rounded-3xl my-4"
      style={{
        background: `
          radial-gradient(circle at 25% 30%, hsl(270, 70%, 30%) 0%, transparent 55%),
          radial-gradient(circle at 75% 40%, hsl(180, 60%, 25%) 0%, transparent 55%),
          radial-gradient(circle at 50% 80%, hsl(230, 70%, 20%) 0%, transparent 60%),
          linear-gradient(135deg, hsl(260, 60%, 12%), hsl(200, 60%, 10%))
        `,
        color: 'white',
      }}>
      <div className="text-center space-y-12 max-w-4xl">
        <p className="text-sm uppercase tracking-widest text-white/70">
          Velg din verden
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <Link
            href="/lys"
            className="group relative block aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-500 hover:scale-[1.03]"
            style={{
              background: `
                radial-gradient(circle at 50% 30%, hsla(270, 80%, 60%, 0.35) 0%, transparent 60%),
                linear-gradient(135deg, hsla(270, 60%, 40%, 0.25), hsla(280, 50%, 20%, 0.25))
              `,
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 drop-shadow-lg">🕯️</div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Lysstøping
              </h2>
              <p className="mt-3 text-sm text-white/75">
                Voks, duft og flammer
              </p>
            </div>
          </Link>

          <Link
            href="/smykker"
            className="group relative block aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-500 hover:scale-[1.03]"
            style={{
              background: `
                radial-gradient(circle at 50% 30%, hsla(180, 70%, 55%, 0.35) 0%, transparent 60%),
                linear-gradient(135deg, hsla(180, 60%, 40%, 0.25), hsla(200, 50%, 20%, 0.25))
              `,
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="text-6xl mb-4 drop-shadow-lg">💎</div>
              <h2 className="text-3xl md:text-4xl font-serif text-white">
                Smykkelaging
              </h2>
              <p className="mt-3 text-sm text-white/75">
                Sølv, perler og stein
              </p>
            </div>
          </Link>
        </div>

        <p className="text-xs text-white/50 italic">
          (Fullverdig pill-animasjon kommer i Fase 6)
        </p>
      </div>
    </div>
  );
}
