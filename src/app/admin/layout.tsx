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
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-10">
      <div className="flex justify-end mb-4">
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <Button variant="ghost" size="sm" type="submit">
            Logg ut ({session.user.email})
          </Button>
        </form>
      </div>
      {children}
    </div>
  );
}
