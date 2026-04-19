type Props = {
  fromColor: string;
  toColor: string;
  variant?: 'gentle' | 'wavy';
};

const PATHS = {
  gentle:
    'M0,30 C300,60 600,10 900,40 C1050,55 1150,25 1200,35 L1200,80 L0,80 Z',
  wavy:
    'M0,20 C150,60 300,10 450,40 C600,65 750,15 900,45 C1050,60 1150,25 1200,40 L1200,80 L0,80 Z',
};

export function SectionDivider({ fromColor, toColor, variant = 'gentle' }: Props) {
  return (
    <div style={{ background: fromColor, lineHeight: 0 }} aria-hidden="true">
      <svg
        className="block w-full"
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        style={{ height: '60px', display: 'block' }}
      >
        <path d={PATHS[variant]} fill={toColor} />
      </svg>
    </div>
  );
}
