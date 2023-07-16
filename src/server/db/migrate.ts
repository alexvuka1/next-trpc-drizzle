import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { exit } from 'process';

const sql = postgres(process.env.DATABASE_URL ?? '', {
  max: 1,
  ssl: process.env.VERCEL_ENV !== 'development' ? 'require' : void 0,
});
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' });
exit(0);
