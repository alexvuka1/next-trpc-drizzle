import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { authorPaperJT } from './authorPaperJT';
import { baseEntity } from './baseEntity';
import { cloudFile } from './cloudFile';

export const paper = pgTable('paper', {
  ...baseEntity,
  title: text('title').notNull(),
  abstract: text('abstract').notNull(),
  downloads: integer('downloads').default(0).notNull(),
  contentId: integer('content_id').references(() => cloudFile.id).notNull(),
  coverPhotoId: integer('cover_photo_id').references(() => cloudFile.id),
});

export const paperRelations = relations(paper, ({ one, many }) => ({
  authorPaperJT: many(authorPaperJT),
  content: one(cloudFile, {
    fields: [paper.contentId],
    references: [cloudFile.id],
  }),
  coverPhoto: one(cloudFile, {
    fields: [paper.coverPhotoId],
    references: [cloudFile.id],
  }),
}));

export type Paper = InferModel<typeof paper>;
