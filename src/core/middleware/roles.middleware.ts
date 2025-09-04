import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error/appError";

// Higher Order Function
// think of it as:
// export function restrictTo(...roles: string[]) {
//  return function (req: Request, res: Response, next: NextFunction) {
//logic
//  };
//};

export const restrictTo =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role))
      throw new AppError(
        403,
        "You do not have permission to perform this action"
      );
    next();
  };
