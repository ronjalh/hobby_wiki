import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-20">
      <section className="text-center space-y-6 mb-16">
        <h1 className="text-5xl md:text-6xl font-serif">
          Ronja sitt hobbyunivers
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Håndlagde lys, smykker og håndarbeid — og historien bak hvert stykke.
        </p>
      </section>

      <section className="flex justify-center">
        <Link
          href="/start"
          className="rounded-2xl border border-neutral-200 px-10 py-8 text-center transition-colors hover:bg-neutral-50"
        >
          <p className="font-serif text-xl mb-2">Start eventyret</p>
          <p className="text-sm text-muted-foreground">
            Velg en verden å utforske
          </p>
        </Link>
      </section>
    </div>
  );
}
