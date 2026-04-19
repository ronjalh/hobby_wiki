'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PostCard } from '@/components/post/PostCard';
import { cn } from '@/lib/utils';
import type { Hobby } from '@/lib/hobbies';

type FeaturedPost = {
  id: string;
  hobby: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | null;
};

type Props = {
  posts: FeaturedPost[];
};

export function FeaturedCarousel({ posts }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const showArrows = posts.length > 3;

  function updateScrollState() {
    const el = containerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    updateScrollState();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [posts.length]);

  function scroll(direction: 'left' | 'right') {
    const el = containerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  }

  if (posts.length === 0) return null;

  // Hvis 3 eller færre: bare grid, ingen carousel
  if (!showArrows) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} data-hobby={post.hobby}>
            <PostCard
              hobby={post.hobby as Hobby}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImageUrl={post.coverImageUrl}
              publishedAt={post.publishedAt}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Venstre pil */}
      <button
        type="button"
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        aria-label="Forrige"
        className={cn(
          'hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10',
          'w-10 h-10 rounded-full bg-white shadow-md items-center justify-center',
          'hover:bg-neutral-50 transition-all',
          !canScrollLeft && 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Høyre pil */}
      <button
        type="button"
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        aria-label="Neste"
        className={cn(
          'hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10',
          'w-10 h-10 rounded-full bg-white shadow-md items-center justify-center',
          'hover:bg-neutral-50 transition-all',
          !canScrollRight && 'opacity-0 pointer-events-none',
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scrollbar container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-4 px-4 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {posts.map((post) => (
          <div
            key={post.id}
            data-hobby={post.hobby}
            className="flex-shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)] snap-start"
          >
            <PostCard
              hobby={post.hobby as Hobby}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImageUrl={post.coverImageUrl}
              publishedAt={post.publishedAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
