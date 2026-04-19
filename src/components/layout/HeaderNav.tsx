'use client';

import { useState, useEffect } from 'react';
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

  const [menuOpen, setMenuOpen] = useState(false);

  // Lukk menyen ved ruteendring
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          className="font-serif text-xl font-semibold tracking-tight shrink-0"
        >
          hobby<span className="text-[var(--color-hobby-accent)]">.wiki</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
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

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-[var(--color-hobby-accent-light)]/30 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-[var(--color-hobby-accent-light)] shadow-md">
          <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2">
            <MobileNavLink href="/lys" label="Lys" hobby="lys" />
            <MobileNavLink
              href="/smykker"
              label="Smykker"
              hobby="smykker"
            />
            <MobileNavLink
              href="/handarbeid"
              label="Nål & tråd"
              hobby="handarbeid"
            />
            <div className="border-t border-[var(--color-hobby-accent-light)]/50 my-1" />
            {isLoggedIn ? (
              isAdmin ? (
                <Link
                  href="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-[var(--color-hobby-accent)] text-white text-center hover:bg-[var(--color-hobby-accent-dark)] transition-colors"
                >
                  Admin
                </Link>
              ) : null
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-sm font-medium border border-[var(--color-hobby-accent)] text-[var(--color-hobby-accent)] text-center hover:bg-[var(--color-hobby-accent-light)]/30 transition-colors"
              >
                Logg inn
              </Link>
            )}
          </div>
        </div>
      )}
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

function MobileNavLink({
  href,
  label,
  hobby,
}: {
  href: string;
  label: string;
  hobby?: 'lys' | 'smykker' | 'handarbeid';
}) {
  return (
    <Link
      href={href}
      data-hobby={hobby}
      className="px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-[var(--color-hobby-accent)] hover:bg-[var(--color-hobby-accent-light)]/20 transition-colors"
    >
      {label}
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}
