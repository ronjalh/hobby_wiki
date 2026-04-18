import { signIn, auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect('/admin');

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-serif">Logg inn</h1>
        <p className="text-muted-foreground">
          Logg inn med Google for å administrere innhold.
        </p>
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/admin' });
          }}
        >
          <Button type="submit" size="lg" className="w-full">
            Logg inn med Google
          </Button>
        </form>
      </div>
    </main>
  );
}
