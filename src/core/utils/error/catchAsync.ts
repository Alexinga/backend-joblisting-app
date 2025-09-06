import { NextFunction, Request, Response } from "express";

// example of a factory that encapsulates the async function and decides how to construct the final product
export const catchAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next); // Passes error to centralized middleware
};

// export const catchAsyncModel = (
//   fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
// ) => {
//   return (req: Request, res: Response, next: NextFunction) =>
//     fn(req, res, next).catch(next);
// };
