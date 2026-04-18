'use client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="nb">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Kritisk feil
        </h1>
        <div
          style={{
            padding: '1rem',
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
          }}
        >
          <p>
            <strong>Message:</strong> {error.message || '(tom)'}
          </p>
          {error.digest && (
            <p style={{ marginTop: '0.5rem' }}>
              <strong>Digest:</strong> {error.digest}
            </p>
          )}
          {error.stack && (
            <pre
              style={{
                marginTop: '1rem',
                padding: '0.5rem',
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: '4px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              {error.stack}
            </pre>
          )}
        </div>
        <a href="/" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Til forsiden
        </a>
      </body>
    </html>
  );
}
