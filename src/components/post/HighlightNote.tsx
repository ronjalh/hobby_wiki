type Props = {
  text: string;
};

export function HighlightNote({ text }: Props) {
  if (!text.trim()) return null;

  return (
    <div
      className="max-w-[240px] mx-auto bg-[hsl(40,45%,92%)] p-5 shadow-md relative"
      style={{
        transform: 'rotate(1.5deg)',
        boxShadow:
          '0 4px 12px -2px hsla(0, 0%, 0%, 0.1), 0 2px 4px -1px hsla(0, 0%, 0%, 0.06)',
      }}
    >
      {/* Liten pink tape */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/pink-tape.png"
        alt=""
        aria-hidden="true"
        className="absolute -top-4 left-1/2 w-20 h-auto pointer-events-none"
        style={{ transform: 'translateX(-50%) rotate(3deg)' }}
      />
      <p
        className="text-base text-neutral-700 leading-relaxed whitespace-pre-line text-center"
        style={{ fontFamily: 'var(--font-handwritten)' }}
      >
        {text}
      </p>
    </div>
  );
}
