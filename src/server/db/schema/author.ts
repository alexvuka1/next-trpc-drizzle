import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { authorPaperJT } from './authorPaperJT';
import { baseEntity } from './baseEntity';
import { cloudFile } from './cloudFile';

export const author = pgTable('author', {
  ...baseEntity,
  name: text('name').notNull(),
  institutionName: text('institution_name').notNull(),
  profilePhotoId: integer('cover_photo_id').references(() => cloudFile.id),
  userId: text('user_id'),
  email: text('email'),
}, (author) => ({
  userIdIndex: uniqueIndex('user_id_index').on(author.userId),
}));

export const authorRelations = relations(author, ({ many, one }) => ({
  authorPaperJT: many(authorPaperJT),
  profilePhoto: one(cloudFile, {
    fields: [author.profilePhotoId],
    references: [cloudFile.id],
  }),
}));

export type Author = InferModel<typeof author>;
