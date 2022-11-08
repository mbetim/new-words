// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { protectedExampleRouter } from "./protected-example-router";
import { definitionsRouter } from "./definitions";
import { languagesRouter } from "./languages";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("auth.", protectedExampleRouter)
  .merge("definitions.", definitionsRouter)
  .merge("languages.", languagesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
