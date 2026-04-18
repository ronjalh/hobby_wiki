import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth/config';

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-serif">
          Ronja sitt hobbyunivers
        </h1>
        <p className="text-xl text-muted-foreground">
          Håndlagde lys og smykker — og historien bak hvert stykke.
        </p>
        <p className="text-sm text-muted-foreground italic">
          (Fase 1 — grunnlag ferdig. Innhold og design kommer i senere faser.)
        </p>
        <div className="flex flex-wrap gap-3 justify-center pt-4">
          {session?.user ? (
            <Link href="/admin" className={buttonVariants({ size: 'lg' })}>
              Til admin-panel
            </Link>
          ) : (
            <Link href="/login" className={buttonVariants({ size: 'lg' })}>
              Logg inn
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
