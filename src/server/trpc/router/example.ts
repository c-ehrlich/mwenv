import { z } from "zod";

import { router, logProcedure } from "../trpc";

export const exampleRouter = router({
  hello: logProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
});
