import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";

export const definitionsRouter = createProtectedRouter().query("getAllDefinitions", {
  async resolve({ ctx }) {
    const user = ctx.session.user;

    const definitions = await prisma.definition.findMany({
      where: { userId: user.id },
      include: { language: { select: { name: true, abbr: true } } },
    });

    return { definitions };
  },
});
