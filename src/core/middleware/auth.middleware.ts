import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error/appError";
import { validateToken } from "../utils/zodValidation/zodUtils";
import { jwtPayloadSchema } from "../../modules/auth/presentation/validators/auth.schema";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = "";
  const authHeader = req.headers.authorization;
  const JWT_TOKEN = process.env.JWT_SECRET!;
  const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_SECRET!;

  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new AppError(401, "Unauthorized");
  // }

  if (authHeader && authHeader?.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    const validatePayload = validateToken(token, jwtPayloadSchema, JWT_TOKEN);
    req.user = validatePayload;
  }

  if (!token && req.cookies.refreshToken) {
    token = req.cookies.refreshToken;
    const validatePayload = validateToken(
      token,
      jwtPayloadSchema,
      JWT_REFRESH_TOKEN
    );
    req.user = validatePayload;
  }

  if (!token) throw new AppError(403, "Unauthorized");

  // const headerToken = authHeader.split(" ")[1];

  //   console.log("extracted auth header:", authHeader);
  //   console.log("extracted token:", token);
  // const validatePayload = validateToken(token, jwtPayloadSchema, JWT_TOKEN);

  //   if ("error" in validatePayload) {
  //     throw new AppError(401, "Invalid token payload", validatePayload.details);
  //   }

  // I have to extend the Request Type to accept this token
  // req.user = validatePayload;

  next();
};
