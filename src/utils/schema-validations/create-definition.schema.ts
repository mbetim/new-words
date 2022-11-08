import { z } from "zod";

export const createDefinitionSchema = z.object({
  value: z.string(),
  knownFrom: z.string().optional(),
  languageId: z.string().cuid(),
  description: z.string(),
});
