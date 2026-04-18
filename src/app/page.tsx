import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20">
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-5xl md:text-6xl font-serif">
          Ronja sitt hobbyunivers
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Håndlagde lys og smykker — og historien bak hvert stykke.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        <Link
          href="/start"
          className="rounded-2xl border border-neutral-200 px-6 py-8 text-center transition-colors hover:bg-neutral-50"
        >
          <p className="font-serif text-xl mb-2">Start eventyret</p>
          <p className="text-sm text-muted-foreground">
            Velg mellom lys og smykker
          </p>
        </Link>

        <div className="rounded-2xl border border-neutral-200 px-6 py-8 text-center">
          <p className="font-serif text-xl mb-2">Gå direkte</p>
          <div className="flex gap-3 justify-center text-sm">
            <Link
              href="/lys"
              data-hobby="lys"
              className="text-[var(--color-hobby-accent)] hover:underline"
            >
              Lys →
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link
              href="/smykker"
              data-hobby="smykker"
              className="text-[var(--color-hobby-accent)] hover:underline"
            >
              Smykker →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
