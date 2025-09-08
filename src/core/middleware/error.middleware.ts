import { NextFunction, Request, Response } from "express";
import { handleError } from "../utils/error/errorHandler";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  handleError(err, res);
  next();
};
