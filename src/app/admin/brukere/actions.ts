'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users, posts } from '@/db/schema';
import { requireAdmin } from '@/lib/auth/roles';

async function countAdmins(): Promise<number> {
  return db.$count(users, eq(users.role, 'admin'));
}

export async function promoteToAdmin(userId: string) {
  await requireAdmin();

  const target = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!target) throw new Error('Bruker finnes ikke');
  if (target.role === 'admin') return;

  await db.update(users).set({ role: 'admin' }).where(eq(users.id, userId));
  revalidatePath('/admin/brukere');
}

export async function demoteAdmin(userId: string) {
  const session = await requireAdmin();

  if (userId === session.user.id) {
    throw new Error('Du kan ikke degradere deg selv');
  }

  const target = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!target) throw new Error('Bruker finnes ikke');
  if (target.role !== 'admin') return;

  const adminCount = await countAdmins();
  if (adminCount <= 1) {
    throw new Error('Må ha minst én admin — kan ikke degradere siste');
  }

  await db.update(users).set({ role: 'user' }).where(eq(users.id, userId));
  revalidatePath('/admin/brukere');
}

export async function deleteUser(userId: string) {
  const session = await requireAdmin();

  if (userId === session.user.id) {
    throw new Error('Du kan ikke slette deg selv');
  }

  const target = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  if (!target) throw new Error('Bruker finnes ikke');

  // Kan ikke slette siste admin
  if (target.role === 'admin') {
    const adminCount = await countAdmins();
    if (adminCount <= 1) {
      throw new Error('Må ha minst én admin — kan ikke slette siste');
    }
  }

  // Overfør eventuelle innlegg til nåværende admin før sletting
  await db
    .update(posts)
    .set({ authorId: session.user.id })
    .where(eq(posts.authorId, userId));

  // Slett brukeren (accounts og sessions cascader automatisk)
  await db.delete(users).where(eq(users.id, userId));

  revalidatePath('/admin/brukere');
}
