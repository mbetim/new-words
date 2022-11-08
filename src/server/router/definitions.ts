import { createProtectedRouter } from "./context";
import { prisma } from "../db/client";
import { createDefinitionSchema } from "../../utils/schema-validations/create-definition.schema";

export const definitionsRouter = createProtectedRouter()
  .query("getAllDefinitions", {
    async resolve({ ctx }) {
      const user = ctx.session.user;

      const definitions = await prisma.definition.findMany({
        where: { userId: user.id },
        include: { language: { select: { name: true, abbr: true } } },
      });

      return { definitions };
    },
  })
  .mutation("createDefinition", {
    input: createDefinitionSchema,
    async resolve({ ctx, input }) {
      const user = ctx.session.user;

      const definition = await prisma.definition.create({
        data: {
          value: input.value,
          knownFrom: input.knownFrom,
          description: input.description,
          language: { connect: { id: input.languageId } },
          user: { connect: { id: user.id } },
        },
      });

      return { definition };
    },
  });
