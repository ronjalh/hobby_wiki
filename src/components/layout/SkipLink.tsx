export function SkipLink() {
  return (
    <a
      href="#hovedinnhold"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[var(--color-accent,var(--color-primary))] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
    >
      Hopp til hovedinnhold
    </a>
  );
}
