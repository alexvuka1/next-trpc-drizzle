import { relations, type InferModel } from 'drizzle-orm';
import { integer, pgTable } from 'drizzle-orm/pg-core';
import { author } from './author';
import { baseEntity } from './baseEntity';
import { paper } from './paper';

export const authorPaperJT = pgTable('author_paper_jt', {
  ...baseEntity,
  authorId: integer('author_id').references(() => author.id).notNull(),
  paperId: integer('paper_id').references(() => paper.id).notNull(),
});

export const authorPaperJTRelations = relations(authorPaperJT, ({ one }) => ({
  author: one(author, {
    fields: [authorPaperJT.authorId],
    references: [author.id],
  }),
  paper: one(paper, {
    fields: [authorPaperJT.paperId],
    references: [paper.id],
  }),
}));

export type AuthorPaperJT = InferModel<typeof authorPaperJT>;
