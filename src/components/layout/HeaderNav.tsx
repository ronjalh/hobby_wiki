'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userEmail: string | null;
};

export function HeaderNav({ isLoggedIn, isAdmin }: Props) {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 120], [72, 56]);
  const blur = useTransform(scrollY, [0, 120], [10, 18]);
  const bgOpacity = useTransform(scrollY, [0, 120], [0.35, 0.6]);

  const pathname = usePathname();
  const hobby = pathname.startsWith('/lys')
    ? 'lys'
    : pathname.startsWith('/smykker')
      ? 'smykker'
      : pathname.startsWith('/handarbeid')
        ? 'handarbeid'
        : null;

  return (
    <motion.header
      data-hobby={hobby}
      style={{
        height,
        backdropFilter: useTransform(blur, (b) => `blur(${b}px)`),
        backgroundColor: useTransform(
          bgOpacity,
          (o) => `hsla(0, 0%, 100%, ${o})`,
        ),
      }}
      className="sticky top-0 z-50 border-b border-[var(--color-hobby-accent-light)]"
    >
      <nav
        aria-label="Hovednavigasjon"
        className="container mx-auto max-w-6xl flex items-center justify-between h-full px-4"
      >
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight"
        >
          hobby<span className="text-[var(--color-hobby-accent)]">.wiki</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink href="/lys" label="Lys" active={hobby === 'lys'} hobby="lys" />
          <NavLink
            href="/smykker"
            label="Smykker"
            active={hobby === 'smykker'}
            hobby="smykker"
          />
          <NavLink
            href="/handarbeid"
            label="Nål & tråd"
            active={hobby === 'handarbeid'}
            hobby="handarbeid"
          />

          {isLoggedIn ? (
            isAdmin ? (
              <Link
                href="/admin"
                className="ml-3 px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--color-hobby-accent)] text-white hover:bg-[var(--color-hobby-accent-dark)] transition-colors"
              >
                Admin
              </Link>
            ) : null
          ) : (
            <Link
              href="/login"
              className="ml-3 px-3 py-1.5 rounded-md text-sm font-medium border border-[var(--color-hobby-accent)] text-[var(--color-hobby-accent)] hover:bg-[var(--color-hobby-accent-light)]/30 transition-colors"
            >
              Logg inn
            </Link>
          )}
        </div>
      </nav>
    </motion.header>
  );
}

function NavLink({
  href,
  label,
  active,
  hobby,
}: {
  href: string;
  label: string;
  active?: boolean;
  hobby?: 'lys' | 'smykker' | 'handarbeid';
}) {
  return (
    <Link
      href={href}
      data-hobby={hobby}
      className={cn(
        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
        'hover:text-[var(--color-hobby-accent)]',
        active
          ? 'text-[var(--color-hobby-accent)]'
          : 'text-foreground/70',
      )}
    >
      {label}
    </Link>
  );
}
