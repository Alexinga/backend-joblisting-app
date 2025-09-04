import { Request, Response } from "express";
// import { ZodSchema } from "zod";
import { formatZodError } from "../error/errorHandler";
import { ZodType } from "zod";
import jwt from "jsonwebtoken";
import z from "zod";
import { AppError } from "../error/appError";

// T | null indicates that the function either returns the validated parsed object of type T or it returns null if validation fails

export function validateBody<T>(
  schema: ZodType<T>,
  req: Request,
  res: Response
): T | null {
  // I added req.query to help with query parameters
  const result = schema.safeParse(req.body);
  // already have a central error

  // if (!result.success) {
  //   res.status(400).json({
  //     error: "Validation error",
  //     details: formatZodError(result.error),
  //   });
  //   return null;
  // }
  // if (!result.success) {
  //   const errObj = {
  //     error: "Validation Error",
  //     details: formatZodError(result.error),
  //   };
  //   throw errObj;
  // }

  if (!result.success) {
    const details = formatZodError(result.error);
    throw new AppError(400, "Validation Error", details);
  }
  return result.data;
}

export function validateToken<T>(
  token: string,
  schema: ZodType<T>,
  secretToken: string
): z.infer<typeof schema> {
  // const JWT_TOKEN = process.env.JWT_SECRET;
  const JWT_TOKEN = secretToken;

  if (!JWT_TOKEN) {
    throw new AppError(500, "JWT_SECRET must be defined");
  }
  // console.log(token, JWT_TOKEN);
  const decoded = jwt.verify(token, JWT_TOKEN);
  console.log(decoded);

  const parsedData = schema.safeParse(decoded);
  if (!parsedData.success) {
    // return res.status(400).json({
    //   error: "Validation Error",
    //   details: formatZodError(parsedData.error),
    // });
    const details = formatZodError(parsedData.error);
    throw new AppError(400, "validation error", details);
    // const errObj = {
    //   error: "Validation Error",
    //   details: formatZodError(parsedData.error),
    // };
    // return errObj;
  }

  return parsedData.data;
}

export function validateQuery<T>(schema: ZodType<T>, req: Request) {
  const queryData = schema.safeParse(req.query);

  if (!queryData.success) {
    const details = formatZodError(queryData.error);
    throw new AppError(400, "validation error", details);
  }

  return queryData.data;
}

export function validateParam<T>(schema: ZodType<T>, req: Request) {
  const paramData = schema.safeParse(req.params);
  if (!paramData.success) {
    const details = formatZodError(paramData.error);
    throw new AppError(400, "param validation error", details);
  }
  return paramData.data;
}
