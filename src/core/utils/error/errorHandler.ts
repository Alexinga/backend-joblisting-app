import { Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "../../../generated/prisma";
import { AppError } from "./appError";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import logger from "../../config/winston";

enum PrismaErrorCode {
  noRecordFound = "P2025",
  dataAlreadyExists = "P2002",
}

// use ZodError as the argument to format error issues and to map over the issues
export const formatZodError = (error: ZodError) => {
  return error.issues.map((err) => ({
    // This helps join the array of errors into example.test.join
    field: err.path.join("."),
    message: err.message,
  }));
};

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof ZodError) {
    // use warn for expected, client-caused or recoverable problems;
    logger.warn(
      `[ZodValidationError] ${JSON.stringify(formatZodError(error))}`
    );
    return res
      .status(400)
      .json({ error: "Validation error", details: formatZodError(error) });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    // use error for unexpected, server-side, or actionable failures
    logger.error(`[PrismaClientValidationError] ${error.message}`);
    return res
      .status(400)
      .json({ error: "Validation failed", message: error.message });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(
      `[PrismaClientKnownError] CODE: ${error.code} - ${error.message}`
    );
    switch (error.code) {
      case PrismaErrorCode.noRecordFound:
        return res.status(404).json({ error: "Record not found" });
      case PrismaErrorCode.dataAlreadyExists:
        return res.status(409).json({ error: "Unique constraint failed" });
      default:
        return res.status(500).json({ error: error.message });
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    logger.error(`[PrismaClientUnknownError] ${error.message}`);
    return res
      .status(500)
      .json({ error: "Unknown Prisma error", message: error.message });
  }

  if (error instanceof AppError) {
    logger.warn(`[AppError] ${error.message}`, { details: error.details });
    return res
      .status(error.statusCode)
      .json({ message: error.message, details: error.details });
  }

  if (error instanceof JsonWebTokenError) {
    logger.warn(`[JWTError] ${error.message}`);
    return res.status(401).json({ errorMsg: error, details: error.message });
  }

  if (error instanceof TokenExpiredError) {
    logger.warn(`[JWTExpired] ${error.message}`);
    return res.status(401).json({ errorMsg: error, details: error.message });
  }

  logger.error(`[UnhandledError] ${(error as Error).message}`);
  // console.error("Unhandled error:", error);
  return res.status(500).json({ error: "Internal server error" });
};
