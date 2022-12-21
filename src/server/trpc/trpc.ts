import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { env } from "../../env/server.mjs";

import { type Context } from "./context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

const logMiddleware = t.middleware(async ({ ctx, next }) => {
  const serverVar = env.SERVERVAR;
  console.log(
    `accessing an env var in the middleware. the value is: ${serverVar}`
  );
  return next({ ctx });
});

export const logProcedure = t.procedure.use(logMiddleware);
