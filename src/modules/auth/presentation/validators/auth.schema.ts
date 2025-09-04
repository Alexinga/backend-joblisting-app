import z from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().max(60),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const jwtPayloadSchema = z.object({
  id: z.number(),
  role: z.string(),
  // email: z.email(),
});

export const jwtSecretSchema = z.object({
  id: z.number(),
});

export const forgotPasswordSchema = z.object({
  email: z.string(),
});
