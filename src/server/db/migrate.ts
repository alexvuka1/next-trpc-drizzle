import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { exit } from 'process';
import { env } from '../../env.mjs';

const sql = postgres(env.DATABASE_URL ?? '', {
  max: 1,
  ssl: env.NODE_ENV !== 'development' ? 'require' : void 0,
});
const db = drizzle(sql);

await migrate(db, { migrationsFolder: 'drizzle' });
exit(0);
