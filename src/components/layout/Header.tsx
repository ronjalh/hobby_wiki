import Link from 'next/link';
import { auth } from '@/lib/auth/config';
import { HeaderNav } from './HeaderNav';

export async function Header() {
  const session = await auth();

  return (
    <HeaderNav
      isLoggedIn={!!session?.user}
      isAdmin={session?.user?.role === 'admin'}
      userEmail={session?.user?.email ?? null}
    />
  );
}
