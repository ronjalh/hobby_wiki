import { db } from '@/db';
import { siteSettings } from '@/db/schema';

export const SETTING_KEYS = {
  heroTitle: 'hero_title',
  heroSubtitle: 'hero_subtitle',
  aboutHeading: 'about_heading',
  aboutBody: 'about_body',
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

export const DEFAULT_SETTINGS: Record<SettingKey, string> = {
  [SETTING_KEYS.heroTitle]: 'Ronja sitt hobbyunivers',
  [SETTING_KEYS.heroSubtitle]:
    'Håndlagde lys, smykker og håndarbeid — og historien bak hvert stykke.',
  [SETTING_KEYS.aboutHeading]: 'Om meg',
  [SETTING_KEYS.aboutBody]:
    'Her kommer teksten om deg. Rediger fra admin → Forside.',
};

export async function getAllSettings(): Promise<Record<SettingKey, string>> {
  const rows = await db.select().from(siteSettings);
  const map = { ...DEFAULT_SETTINGS };
  for (const row of rows) {
    if (row.key in map) {
      map[row.key as SettingKey] = row.value;
    }
  }
  return map;
}
