import type { Metadata } from 'next';
import { Playfair_Display, Inter, Caveat } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipLink } from '@/components/layout/SkipLink';
import { WaveTransition } from '@/components/layout/WaveTransition';

const serif = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
});

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const handwritten = Caveat({
  variable: '--font-handwritten',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hobby-wiki.vercel.app'),
  title: {
    default: 'Ronja sitt hobbyunivers',
    template: '%s · Ronja',
  },
  description:
    'Håndlagde lys og smykker — historiene bak hvert stykke.',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    siteName: 'Ronja sitt hobbyunivers',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nb"
      className={`${serif.variable} ${sans.variable} ${handwritten.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <SkipLink />
        <Header />
        <main id="hovedinnhold" className="flex-1">
          {children}
        </main>
        <WaveTransition />
        <Footer />
      </body>
    </html>
  );
}
