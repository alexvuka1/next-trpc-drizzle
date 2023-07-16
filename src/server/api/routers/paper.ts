import { createTRPCRouter, publicProcedure } from "@server/api/trpc";
import { db } from "@server/db";
import { paperValidator } from "@server/api/validators/paper.typia";

export const paperRouter = createTRPCRouter({

  findMany: publicProcedure
    .input(paperValidator)
    .query(async ({ input }) => {
      const papers = await db.query.paper.findMany(input);
      return papers;
    }),

});
