import { createRouter } from "./context";
import { prisma } from "../db/client";

export const languagesRouter = createRouter().query("getAllLanguages", {
  async resolve() {
    const languages = await prisma.language.findMany();
    return { languages };
  },
});
