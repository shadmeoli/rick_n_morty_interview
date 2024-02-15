import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({

  create: publicProcedure
    .input(z.object({ 
      character_name: z.string().min(1),
      note: z.string()

    }))
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.notes.create({
        data: {
          character_name: input.character_name,
          note: input.note
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.notes.findMany({
      orderBy: { CreatedAt: "desc" },
    });
  }),
});
