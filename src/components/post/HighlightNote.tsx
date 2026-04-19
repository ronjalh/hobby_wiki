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
      {/* Liten teipbit øverst */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-[2px]"
        style={{
          background:
            'linear-gradient(180deg, hsla(0, 0%, 15%, 0.65) 0%, hsla(0, 0%, 25%, 0.6) 100%)',
          transform: 'rotate(2deg)',
        }}
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
