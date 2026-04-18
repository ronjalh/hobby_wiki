import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="text-4xl md:text-5xl font-serif">Siden finnes ikke</h1>
        <p className="text-muted-foreground">
          Sjekk URL-en eller gå tilbake til forsiden.
        </p>
        <div className="flex gap-3 justify-center pt-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Til forsiden
          </Link>
          <Link
            href="/start"
            className="px-5 py-2.5 rounded-md text-sm font-medium border border-border hover:bg-muted transition-colors"
          >
            Velg verden
          </Link>
        </div>
      </div>
    </div>
  );
}
