import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth/config';
import { Button } from '@/components/ui/button';
import { AdminSubNav } from '@/components/admin/AdminSubNav';

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

  const { name, email, image } = session.user;

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between mb-6 gap-4">
        <AdminSubNav />
        <Link
          href="/admin/profil"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted transition-colors"
          aria-label="Profil"
        >
          {image ? (
            <Image
              src={image}
              alt=""
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
              {(name ?? email ?? '?').charAt(0).toUpperCase()}
            </div>
          )}
          <span className="text-sm hidden sm:inline max-w-[160px] truncate">
            {name ?? email}
          </span>
        </Link>
      </div>
      {children}
    </div>
  );
}
