import jwt from "jsonwebtoken";
import { AppError } from "../error/appError";

// export const signToken = (payload: object) => {
//   const JWT_TOKEN = process.env.JWT_SECRET;

//   if (!JWT_TOKEN) {
//     throw new Error("JWT_SECRET must be defined");
//   }
//   const EXPIRES_IN = "1d";
//   return jwt.sign(payload, JWT_TOKEN, { expiresIn: EXPIRES_IN });
// };

// export const refreshToken = (payload: object) => {
//   const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;
//   if (!JWT_REFRESH) {
//     throw new Error("JWT_REFRESH_SECRET must be defined");
//   }
//   const EXPIRES_IN = "7d";
//   return jwt.sign(payload, JWT_REFRESH, { expiresIn: EXPIRES_IN });
// };

export const createAccessOrRefreshToken = (
  payload: object,
  expires: "1d" | "7d",
  secretToken: string
) => {
  const JWT_TOKEN = secretToken;
  if (!JWT_TOKEN) {
    throw new AppError(
      401,
      `There must be a defined secret code. secretToken is not a current token`
    );
  }

  const EXPIRES_IN = expires;

  return jwt.sign(payload, JWT_TOKEN, { expiresIn: EXPIRES_IN });
};
