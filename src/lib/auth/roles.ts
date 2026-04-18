import { auth } from './config';

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error('Ikke innlogget');
  }
  if (session.user.role !== 'admin') {
    throw new Error('Krever admin-tilgang');
  }
  return session;
}

export async function isAdmin(): Promise<boolean> {
  const session = await auth();
  return session?.user?.role === 'admin';
}
