'use client';

import Script from 'next/script';
import { useEffect } from 'react';

type Props = {
  posts: Array<{ id: string; embedHtml: string }>;
};

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function InstagramEmbeds({ posts }: Props) {
  useEffect(() => {
    // Når komponenten oppdateres med nye innlegg, re-prosesser embeds
    if (typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [posts]);

  if (posts.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {posts.map((post) => (
          <div
            key={post.id}
            dangerouslySetInnerHTML={{ __html: post.embedHtml }}
          />
        ))}
      </div>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window !== 'undefined' && window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }}
      />
    </>
  );
}
