import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { auth } from '@/lib/auth/config';

export async function AdminEditButton({ postId }: { postId: string }) {
  const session = await auth();
  if (session?.user?.role !== 'admin') return null;

  return (
    <Link
      href={`/admin/innlegg/${postId}`}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground text-background shadow-lg hover:scale-105 transition-transform"
      aria-label="Rediger innlegg"
    >
      <Pencil className="w-4 h-4" />
      <span className="text-sm font-medium">Rediger</span>
    </Link>
  );
}
