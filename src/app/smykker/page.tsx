import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smykkelaging',
  description: 'Håndlagde smykker — metaller, perler og teknikker.',
};

export default function SmykkerPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16">
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-5xl md:text-6xl font-serif">Smykkelaging</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unike smykker av sølv, perler og stein — fra idé til ferdig stykke.
        </p>
      </header>

      <div className="border border-[var(--color-hobby-accent-light)] rounded-2xl p-12 text-center bg-[var(--color-hobby-accent-light)]/10">
        <p className="text-muted-foreground italic">
          Ingen innlegg ennå. Fase 3 legger til innholds-editoren.
        </p>
      </div>
    </div>
  );
}
