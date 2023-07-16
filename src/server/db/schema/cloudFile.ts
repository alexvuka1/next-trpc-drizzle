import { boolean, pgTable, text, uniqueIndex } from 'drizzle-orm/pg-core';
import { baseEntity } from './baseEntity';
import { type InferModel, relations } from 'drizzle-orm';
import { paper } from './paper';

export const cloudFile = pgTable('cloud_file', {
  ...baseEntity,
  isCompleted: boolean('is_completed').default(false).notNull(),
  isPublic: boolean('is_public').default(false).notNull(),
  fileName: text('file_name').notNull(),
}, (cloudFile) => ({
  fileNameIndex: uniqueIndex('file_name_index').on(cloudFile.fileName),
}));

export const cloudFileRelations = relations(cloudFile, ({ one }) => ({
  contentInPaper: one(paper, {
    relationName: 'content_in_paper',
    fields: [cloudFile.id],
    references: [paper.contentId],
  }),
  coverPhotoInPaper: one(paper, {
    relationName: 'content_photo_in_paper',
    fields: [cloudFile.id],
    references: [paper.coverPhotoId],
  }),
}));

export type CloudFile = InferModel<typeof cloudFile>;
