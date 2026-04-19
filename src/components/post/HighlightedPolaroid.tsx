import Link from 'next/link';
import type { Hobby } from '@/lib/hobbies';

type Props = {
  hobby: Hobby;
  slug: string;
  title: string;
  coverImageUrl?: string | null;
  publishedAt?: Date | null;
  rotation?: number;
};

export function HighlightedPolaroid({
  hobby,
  slug,
  title,
  coverImageUrl,
  publishedAt,
  rotation = -2,
}: Props) {
  return (
    <Link
      href={`/${hobby}/${slug}`}
      className="group relative block max-w-[260px] mx-auto transition-transform duration-300 hover:scale-[1.02] hover:rotate-0"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Pink tape — i midten, samme vinkel som kortet, mye overlapp */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pink-tape.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-auto z-10 pointer-events-none"
        style={{
          filter: 'drop-shadow(0 2px 3px hsla(340, 40%, 30%, 0.15))',
        }}
      />

      {/* Polaroid */}
      <div className="bg-white p-3 pb-8 shadow-[0_6px_20px_-4px_hsla(0,0%,0%,0.2)]">
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
        <div className="pt-3 text-center">
          <p className="font-serif text-base leading-tight line-clamp-2 mb-1">
            {title}
          </p>
          {publishedAt && (
            <p
              className="text-lg text-neutral-600"
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
      </div>
    </Link>
  );
}
