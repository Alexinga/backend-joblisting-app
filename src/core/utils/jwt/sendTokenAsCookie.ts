import { Response } from "express";
import { createAccessOrRefreshToken } from "./jwt";

type SendTokenAsCookie = {
  res: Response;
  daysForToken: number;
  secretToken: string;
  userPayload: object;
  cookieName: string;
};

export function sendTokenAsCookie({
  res,
  daysForToken,
  secretToken,
  userPayload,
  cookieName,
}: SendTokenAsCookie) {
  const expiresInString = `${daysForToken}d`;
  const maxAgeToken = daysForToken * 24 * 60 * 60 * 1000;
  const refreshToken = createAccessOrRefreshToken(
    userPayload,
    expiresInString as "1d" | "7d",
    secretToken
  );

  res.cookie(cookieName, refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
    maxAge: maxAgeToken,
  });
}
