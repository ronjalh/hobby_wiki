'use client';

import { useState, useTransition } from 'react';
import { updateAllSettings } from '@/app/admin/forside/actions';
import { SETTING_KEYS, type SettingKey } from '@/lib/settings';
import { Button } from '@/components/ui/button';

type Props = {
  initial: Record<SettingKey, string>;
};

export function ForsideSettingsForm({ initial }: Props) {
  const [values, setValues] = useState(initial);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(key: SettingKey, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await updateAllSettings(values);
        setSaved(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Noe gikk galt');
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field
        label="Hero-tittel"
        value={values[SETTING_KEYS.heroTitle]}
        onChange={(v) => update(SETTING_KEYS.heroTitle, v)}
      />
      <Field
        label="Hero-undertekst"
        value={values[SETTING_KEYS.heroSubtitle]}
        onChange={(v) => update(SETTING_KEYS.heroSubtitle, v)}
        multiline
      />
      <Field
        label='Overskrift for "Om meg"'
        value={values[SETTING_KEYS.aboutHeading]}
        onChange={(v) => update(SETTING_KEYS.aboutHeading, v)}
      />
      <Field
        label='Tekst for "Om meg"'
        value={values[SETTING_KEYS.aboutBody]}
        onChange={(v) => update(SETTING_KEYS.aboutBody, v)}
        multiline
        rows={6}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? 'Lagrer...' : 'Lagre endringer'}
        </Button>
        {saved && (
          <span
            role="status"
            className="text-sm text-green-700"
          >
            ✓ Lagret
          </span>
        )}
        {error && (
          <span role="alert" className="text-sm text-destructive">
            {error}
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full px-4 py-3 rounded-lg border bg-background resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border bg-background"
        />
      )}
    </label>
  );
}
