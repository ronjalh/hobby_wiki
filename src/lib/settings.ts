// Klient-trygt: kun konstanter og typer. Ingen db-import.

export const SETTING_KEYS = {
  heroTitle: 'hero_title',
  heroSubtitle: 'hero_subtitle',
  aboutHeading: 'about_heading',
  aboutBody: 'about_body',
  highlightNote: 'highlight_note',
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

export const DEFAULT_SETTINGS: Record<SettingKey, string> = {
  [SETTING_KEYS.heroTitle]: 'Ronja sitt hobbyunivers',
  [SETTING_KEYS.heroSubtitle]:
    'Håndlagde lys, smykker og håndarbeid — og historien bak hvert stykke.',
  [SETTING_KEYS.aboutHeading]: 'Om meg',
  [SETTING_KEYS.aboutBody]:
    'Her kommer teksten om deg. Rediger fra admin → Forside.',
  [SETTING_KEYS.highlightNote]:
    'Mine to favoritter\nakkurat nå ✨',
};
