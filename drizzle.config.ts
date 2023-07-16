import type { Config } from 'drizzle-kit';
import { env } from 'src/env.mjs';

export default {
  schema: './src/server/db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL ?? '',
  },
} satisfies Config;
