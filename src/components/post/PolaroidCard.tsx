import Link from 'next/link';
import type { Hobby } from '@/lib/hobbies';

type Props = {
  hobby: Hobby;
  slug: string;
  title: string;
  coverImageUrl?: string | null;
  publishedAt?: Date | null;
  size?: 'sm' | 'md';
};

export function PolaroidCard({
  hobby,
  slug,
  title,
  coverImageUrl,
  publishedAt,
  size = 'md',
}: Props) {
  const sizeClasses = size === 'sm' ? 'max-w-[180px]' : 'max-w-[220px]';

  return (
    <Link
      href={`/${hobby}/${slug}`}
      className={`group block ${sizeClasses} mx-auto bg-white p-3 pb-4 shadow-md hover:shadow-xl hover:-translate-y-1 hover:rotate-0 transition-all duration-300`}
      style={{ transform: 'rotate(-1deg)' }}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        {coverImageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={coverImageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
            Ingen bilde
          </div>
        )}
      </div>
      <div className="pt-3 pb-1 text-center">
        <p className="font-serif text-sm leading-tight line-clamp-2 mb-1">
          {title}
        </p>
        {publishedAt && (
          <p
            className="text-base text-neutral-600"
            style={{ fontFamily: 'var(--font-handwritten)' }}
          >
            {new Date(publishedAt).toLocaleDateString('nb-NO', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
