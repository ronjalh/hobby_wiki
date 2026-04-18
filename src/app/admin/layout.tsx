import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth/config';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session.user.role !== 'admin') {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-3xl font-serif">Ikke tilgang</h1>
          <p className="text-muted-foreground">
            Du er logget inn som {session.user.email}, men har ikke admin-rolle.
          </p>
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
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <h1 className="font-serif text-lg">Hobby Wiki — Admin</h1>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{session.user.email}</span>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button variant="ghost" size="sm" type="submit">
              Logg ut
            </Button>
          </form>
        </div>
      </header>
      <main className="px-4 py-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
