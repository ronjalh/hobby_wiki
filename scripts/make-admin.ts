import { config } from 'dotenv';
config({ path: '.env.local' });

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { users } from '../src/db/schema';

const EMAIL = process.argv[2];

async function main() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  if (!EMAIL) {
    const all = await db
      .select({ email: users.email, name: users.name, role: users.role })
      .from(users);
    console.log('Registrerte brukere:');
    console.table(all);
    console.log(
      '\nKjør igjen med email: npx tsx scripts/make-admin.ts <email>',
    );
    return;
  }

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, EMAIL));

  if (existing.length === 0) {
    console.error(`Ingen bruker funnet med email ${EMAIL}.`);
    console.error('Du må logge inn med Google først, så kjør scriptet igjen.');
    process.exit(1);
  }

  await db.update(users).set({ role: 'admin' }).where(eq(users.email, EMAIL));
  console.log(`✓ ${EMAIL} er nå admin.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
