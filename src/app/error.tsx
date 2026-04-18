'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error caught by error.tsx:', error);
  }, [error]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-serif mb-4">Det skjedde noe galt</h1>

      <div className="rounded-lg border border-red-200 bg-red-50 p-5 space-y-4 text-sm">
        <div>
          <p className="font-semibold text-red-900">Melding:</p>
          <p className="font-mono text-red-900 mt-1 break-all">
            {error.message || '(tom)'}
          </p>
        </div>

        {error.digest && (
          <div>
            <p className="font-semibold text-red-900">Digest:</p>
            <p className="font-mono text-red-900 mt-1">{error.digest}</p>
          </div>
        )}

        {error.stack && (
          <div>
            <p className="font-semibold text-red-900">Stack:</p>
            <pre className="mt-1 p-3 bg-white rounded border border-red-200 text-xs overflow-x-auto whitespace-pre-wrap text-red-900">
              {error.stack}
            </pre>
          </div>
        )}

        {error.cause !== undefined && (
          <div>
            <p className="font-semibold text-red-900">Cause:</p>
            <pre className="mt-1 p-3 bg-white rounded border border-red-200 text-xs overflow-x-auto whitespace-pre-wrap text-red-900">
              {String(error.cause)}
            </pre>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Prøv igjen</Button>
        <Button variant="outline" onClick={() => (window.location.href = '/')}>
          Til forsiden
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Tips: På produksjon skjuler Next.js ofte den ekte feilmeldingen av
        sikkerhetshensyn. Sjekk Vercel Dashboard → Logs og søk etter digest-IDen
        over for full stacktrace.
      </p>
    </div>
  );
}
