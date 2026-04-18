'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  promoteToAdmin,
  demoteAdmin,
  deleteUser,
} from '@/app/admin/brukere/actions';
import { Button } from '@/components/ui/button';

type Props = {
  userId: string;
  userEmail: string;
  userRole: 'admin' | 'user';
  isCurrentUser: boolean;
  postCount: number;
  isLastAdmin: boolean;
};

export function UserRowActions({
  userId,
  userEmail,
  userRole,
  isCurrentUser,
  postCount,
  isLastAdmin,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function run(action: () => Promise<void>) {
    setError(null);
    startTransition(async () => {
      try {
        await action();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Noe gikk galt');
      }
    });
  }

  function handlePromote() {
    run(() => promoteToAdmin(userId));
  }

  function handleDemote() {
    if (!confirm(`Fjerne admin-rollen fra ${userEmail}?`)) return;
    run(() => demoteAdmin(userId));
  }

  function handleDelete() {
    const postWarning =
      postCount > 0
        ? `\n\nDenne brukeren har ${postCount} innlegg — de blir overført til deg.`
        : '';
    if (
      !confirm(
        `Slett brukeren ${userEmail}?${postWarning}\n\nHandlingen kan ikke angres.`,
      )
    )
      return;
    run(() => deleteUser(userId));
  }

  if (isCurrentUser) {
    return (
      <span className="text-xs text-muted-foreground italic">
        Ingen handlinger på egen konto
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-1">
        {userRole === 'user' ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePromote}
            disabled={pending}
          >
            Gjør til admin
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDemote}
            disabled={pending || isLastAdmin}
            title={isLastAdmin ? 'Må ha minst én admin' : undefined}
          >
            Fjern admin
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={pending || isLastAdmin}
          className="text-destructive hover:text-destructive"
          title={isLastAdmin ? 'Kan ikke slette siste admin' : undefined}
        >
          Slett
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
