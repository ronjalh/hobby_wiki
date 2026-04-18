import Link from 'next/link';

type Props = {
  hobby: 'lys' | 'smykker';
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl?: string | null;
  publishedAt?: Date | null;
};

export function PostCard({ hobby, slug, title, excerpt, publishedAt }: Props) {
  return (
    <Link
      href={`/${hobby}/${slug}`}
      className="group block rounded-2xl border border-[var(--color-hobby-accent-light)] bg-background hover:border-[var(--color-hobby-accent)] hover:shadow-sm transition-all overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-serif leading-tight group-hover:text-[var(--color-hobby-accent)] transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        )}
        {publishedAt && (
          <p className="mt-3 text-xs text-muted-foreground">
            {new Date(publishedAt).toLocaleDateString('nb-NO', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
