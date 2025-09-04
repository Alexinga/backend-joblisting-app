import z, { string } from "zod";

export const addNameSchema = z.object({
  newName: z.string().min(1),
});

export const updateNameSchema = z.object({
  currentName: z.string().min(1),
  newName: z.string().min(1),
});

export const deleteNameSchema = z.object({
  name: z.string().min(1),
});
