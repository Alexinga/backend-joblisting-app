import z from "zod";

export const createUserZodSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().nullable(),
  role: z.enum(["USER", "ADMIN", "MANAGER"]),
});
export const updateUserIdSchema = z.object({
  id: z.coerce.number(),
});

export const updateUserZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  roles: z.enum(["USER", "ADMIN", "MANAGER"]).optional(),
});

export const deleteUserZodSchema = z.object({
  id: z.coerce.number(),
});
