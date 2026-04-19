import { Flame, Gem, Scissors, type LucideIcon } from 'lucide-react';

export type Hobby = 'lys' | 'smykker' | 'handarbeid';

export type HobbyConfig = {
  slug: Hobby;
  label: string;
  description: string;
  icon: LucideIcon;
  emoji: string;
};

export const HOBBIES: Record<Hobby, HobbyConfig> = {
  lys: {
    slug: 'lys',
    label: 'Lysstøping',
    description: 'Voks, duft og flammer',
    icon: Flame,
    emoji: '🕯️',
  },
  smykker: {
    slug: 'smykker',
    label: 'Smykkelaging',
    description: 'Sølv, perler og stein',
    icon: Gem,
    emoji: '💎',
  },
  handarbeid: {
    slug: 'handarbeid',
    label: 'Nål og tråd',
    description: 'Søm, broderi og stoff',
    icon: Scissors,
    emoji: '🧵',
  },
};

export const HOBBY_KEYS: Hobby[] = Object.keys(HOBBIES) as Hobby[];

export function isHobby(value: unknown): value is Hobby {
  return typeof value === 'string' && value in HOBBIES;
}

export function getOtherHobbies(current: Hobby): HobbyConfig[] {
  return HOBBY_KEYS.filter((k) => k !== current).map((k) => HOBBIES[k]);
}
