import Image from 'next/image';
import { auth, signOut } from '@/lib/auth/config';
import { Button } from '@/components/ui/button';

export default async function ProfilPage() {
  const session = await auth();
  if (!session?.user) return null;

  const { name, email, image, role } = session.user;

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="text-3xl font-serif">Profil</h2>
        <p className="text-muted-foreground mt-1">
          Kontoinformasjon og innstillinger
        </p>
      </div>

      {/* Brukerinfo */}
      <section className="rounded-2xl border p-6">
        <div className="flex items-center gap-4">
          {image ? (
            <Image
              src={image}
              alt={name ?? email ?? ''}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-2xl font-serif">
              {(name ?? email ?? '?').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            {name && <p className="font-medium text-lg">{name}</p>}
            <p className="text-muted-foreground text-sm">{email}</p>
            <p className="mt-1">
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  role === 'admin'
                    ? 'bg-[var(--color-hobby-accent-light)]/40 text-[var(--color-hobby-accent-dark)]'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {role === 'admin' ? 'Administrator' : 'Bruker'}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Innstillinger (placeholder) */}
      <section className="rounded-2xl border p-6 space-y-4">
        <h3 className="font-serif text-xl">Innstillinger</h3>
        <p className="text-sm text-muted-foreground italic">
          Flere valg kommer i senere faser — f.eks. mørk modus, varsler, og
          administrasjon av andre admins.
        </p>
      </section>

      {/* Sesjon */}
      <section className="rounded-2xl border p-6 space-y-4">
        <div>
          <h3 className="font-serif text-xl">Sesjon</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Logg ut for å avslutte økten.
          </p>
        </div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <Button variant="outline" type="submit">
            Logg ut
          </Button>
        </form>
      </section>
    </div>
  );
}
