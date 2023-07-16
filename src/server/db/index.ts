import type { ExtractTablesWithRelations } from 'drizzle-orm';
import * as schema from 'src/server/db/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from 'src/env.mjs';

export type Tables = ExtractTablesWithRelations<typeof schema>;

export const db = drizzle(postgres(env.DATABASE_URL), { schema, logger: !!env.DB_LOGGER });
