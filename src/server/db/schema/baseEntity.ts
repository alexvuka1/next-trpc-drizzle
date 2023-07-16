import { serial, timestamp, type AnyPgColumnBuilder } from 'drizzle-orm/pg-core';

export const baseEntity = {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
} satisfies Record<string, AnyPgColumnBuilder>;
