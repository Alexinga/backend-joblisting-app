import { Router } from "express";

import passport from "passport";
import { catchAsync } from "../../../../core/utils/error/catchAsync";
import {
  createGoogleJWT,
  forgotPassword,
  loginUser,
  refresh,
  registerUser,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", catchAsync(registerUser));
router.post("/login", catchAsync(loginUser));

router.post("/refresh", catchAsync(refresh));
router.post("/forgot-password", catchAsync(forgotPassword));

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  createGoogleJWT
);
export default router;
