import { Request, Response } from "express";
import {
  validateBody,
  validateToken,
} from "../../../../core/utils/zodValidation/zodUtils";
import {
  forgotPasswordSchema,
  jwtSecretSchema,
  loginSchema,
  registerSchema,
} from "../validators/auth.schema";
import { createAccessOrRefreshToken } from "../../../../core/utils/jwt/jwt";
import { sendTokenAsCookie } from "../../../../core/utils/jwt/sendTokenAsCookie";
import { AppError } from "../../../../core/utils/error/appError";
import { authService } from "../../../../server";

const JWT_ACCESS = process.env.JWT_SECRET!;
const JWT_REFRESH = process.env.JWT_REFRESH_SECRET!;

export const registerUser = async (req: Request, res: Response) => {
  const validationCheck = validateBody(registerSchema, req, res);
  if (!validationCheck) return;

  // const { email, name, password } = validationCheck;

  const addNewUser = await authService.registerUser(validationCheck);

  // const hashedPassword = await authService.createHashPassword(password);

  // const hash = await bcrypt.hash(password, 10);
  // const addNewUser = await prisma.user.create({
  //   data: {
  //     name: name,
  //     email: email,
  //     password: hash,
  //   },
  // });
  // Because you explicitly destructured password into _, the password property is "taken" by that part of the destructuring assignment. The rest operator then collects everything else. So, userWithoutPassword will be a new object containing all the properties of addNewUser except for the password property.
  // const { password: _, ...userWithoutPassword } = addNewUser;

  const token = createAccessOrRefreshToken(
    { id: addNewUser.id, role: addNewUser.role },
    "1d",
    JWT_ACCESS
  );

  sendTokenAsCookie({
    res,
    daysForToken: 7,
    secretToken: JWT_REFRESH,
    userPayload: { id: addNewUser.id, role: addNewUser.role },
    cookieName: "refreshToken",
  });
  res.status(201).json({
    message: "Registered new user",
    data: addNewUser,
    token: token,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const checkParsedBody = validateBody(loginSchema, req, res);
  if (!checkParsedBody) return;

  const loginUser = await authService.loginUser(checkParsedBody);
  // const { email, password } = checkParsedBody;

  // const selectUser = await prisma.user.findUnique({
  //   where: {
  //     email: email,
  //   },
  // });

  // if (!selectUser) {
  //   throw new AppError(404, "User Not Found");
  // }

  // if (selectUser.authProvider === "GOOGLE" && !selectUser.password)
  //   throw new AppError(
  //     401,
  //     "This account was created using Google. Please sign in with Google."
  //   );

  // const isMatch = await bcrypt.compare(password, selectUser.password!);

  // if (!isMatch) {
  //   throw new AppError(401, "Invalid Credentials");
  // }
  const token = createAccessOrRefreshToken(
    { id: loginUser.id, role: loginUser.role },
    "1d",
    JWT_ACCESS
  );
  // const tokenRefresh = createAccessOrRefreshToken(
  //   { id: selectUser.id },
  //   "7d",
  //   JWT_REFRESH
  // );
  // const token = signToken({ id: selectUser.id });
  // const tokenRefresh = refreshToken({ id: selectUser.id });

  // const { password: _, ...userWithoutPassword } = selectUser;

  sendTokenAsCookie({
    res,
    daysForToken: 7,
    secretToken: JWT_REFRESH,
    userPayload: { id: loginUser.id, role: loginUser.role },
    cookieName: "refreshToken",
  });
  // res.cookie("refreshToken", tokenRefresh, {
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: false, // only set to true in production (with HTTPS)
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });
  res.status(200).json({
    message: "Logged in successfully",
    data: loginUser,
    token: token,
  });
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken: string = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(401, "No refresh token found");
  }

  // const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;

  // if (!JWT_REFRESH) {
  //   throw new Error("JWT_REFRESH_SECRET must be defined in controller");
  // }

  const decoded = validateToken(refreshToken, jwtSecretSchema, JWT_REFRESH);

  // const user = await prisma.user.findUnique({ where: { id: decoded.id } });

  // if (!user) {
  //   throw new AppError(401, "user no longer exists");
  // }

  const selectUser = await authService.getRefreshedUserData(decoded.id);

  const newAccessToken = createAccessOrRefreshToken(
    { id: selectUser.id, role: selectUser.role },
    "1d",
    JWT_ACCESS
  );

  // const newRefreshToken = createAccessOrRefreshToken(
  //   { id: user.id },
  //   "7d",
  //   JWT_REFRESH
  // );

  // const newAccessToken = signToken({ id: user.id });
  // const newRefreshToken = refreshToken({ id: user.id });

  // res.cookie("refreshToken", newRefreshToken, {
  //   httpOnly: true,
  //   sameSite: "strict",
  //   secure: false,
  //   maxAge: 7 * 24,
  // });

  sendTokenAsCookie({
    res,
    daysForToken: 7,
    secretToken: JWT_REFRESH,
    userPayload: { id: selectUser.id, role: selectUser.role },
    cookieName: "refreshToken",
  });

  res
    .status(200)
    .json({ message: "New Token Refreshed", token: newAccessToken });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const parsedData = validateBody(forgotPasswordSchema, req, res);
  if (!parsedData) return;
  const { email } = parsedData;

  await authService.forgotPassword(email);

  // const user = await prisma.user.findUnique({ where: { email: email } });

  // if (!user) throw new AppError(401, "No User Found");
  // if (!user) {
  //   res.status(200).json({ message: "Reset link sent to email" });
  // }

  // const resetToken = crypto.randomBytes(32).toString("hex");
  // const hashedToken = crypto
  //   .createHash("sha256")
  //   .update(resetToken)
  //   .digest("hex");
  // const expires = new Date(Date.now() + 100 * 60 * 15); // 15 mins

  // await prisma.passwordReset.create({
  //   data: {
  //     userId: user!.id,
  //     token: hashedToken,
  //     expiresAt: expires,
  //   },
  // });

  //TODO ADD EMAIL SENT TO USER WITH CONFIRMATION

  res.status(200).json({ message: "Reset link generated" });
};

export const logout = async (req: Request, res: Response) => {
  const refreshTokens = req.cookies.refreshToken;

  if (!refreshTokens)
    throw new AppError(400, "There is no refresh token, you need to set one");

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: false,
  });

  res.status(200).json({ message: "Logged Out successfully" });
};

export const createGoogleJWT = (req: Request, res: Response) => {
  // const token = createAccessOrRefreshToken(
  //   { id: req.user?.id, role: req.user?.role },
  //   "1d",
  //   JWT_ACCESS
  // );

  sendTokenAsCookie({
    res: res,
    daysForToken: 7,
    secretToken: JWT_REFRESH,
    userPayload: { id: req.user?.id, role: req.user?.role },
    cookieName: "refreshToken",
  });

  res.redirect(`/test/authTest`);
};
