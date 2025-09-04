import { Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../../generated/prisma";
import { AppError } from "./appError";

import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const formatZodError = (error: ZodError) => {
  return error.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
};

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ error: "Validation error", details: formatZodError(error) });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2025":
        return res.status(404).json({ error: "Record not found" });
      case "P2002":
        return res.status(409).json({ error: "Unique constraint failed" });
      default:
        return res.status(500).json({ error: error.message });
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res
      .status(400)
      .json({ error: "Validation failed", message: error.message });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return res
      .status(500)
      .json({ error: "Unknown Prisma error", message: error.message });
  }

  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ message: error.message, details: error.details });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ errorMsg: error, details: error.message });
  }

  if (error instanceof TokenExpiredError) {
    return res.status(401).json({ errorMsg: error, details: error.message });
  }

  console.error("Unhandled error:", error);
  return res.status(500).json({ error: "Internal server error" });
};
