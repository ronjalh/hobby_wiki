import 'server-only';
import { db } from '@/db';
import { siteSettings } from '@/db/schema';
import { DEFAULT_SETTINGS, type SettingKey } from './settings';

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
