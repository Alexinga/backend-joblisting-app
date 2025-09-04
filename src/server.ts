// You need this path for types/express/index to work
/// <reference path="core/types/express/index.d.ts" />

// Need this dotenv at the beginning for env to pass thru
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import namesRouter from "./routes/names.routes";
import mainRouter from "./routes/main.routes";
import jobsRouter from "./modules/job/presentation/routes/jobs.routes";
import authRouter from "./modules/auth/presentation/routes/auth.routes";
import testSiteRouter from "./routes/testSite.route";
import companyRouter from "./modules/company/presentation/routes/company.routes";
import userRouter from "./modules/user/presentation/routes/user.routes";
import prisma from "./prisma";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./core/middleware/error.middleware";
import { xss } from "express-xss-sanitizer";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import hpp from "hpp";
import passport from "passport";
// You need to import this config for passport to work
import "./core/config/passport";
import { JobRepository } from "./modules/job/infrastructure/repositories/JobRespositroy";
import { JobService } from "./modules/job/application/service/job.service";

import { CompanyService } from "./modules/company/application/service/company.service";
import { CompanyRepository } from "./modules/company/infrastructure/repositories/CompanyRepo";
import { AuthRepository } from "./modules/auth/infrastrcuture/repositories/authRepo";
import { AuthService } from "./modules/auth/application/service/auth.service";
import { UserRepository } from "./modules/user/infrastructure/repositories/UserRepo";
import { UserService } from "./modules/user/application/service/user.service";
import { PasswordResetRepository } from "./modules/auth/infrastrcuture/repositories/passwordResetRepo";

const app = express();
const PORT = 5528;

// Create a jobRepository for the service to access
const jobRepository = new JobRepository();
export const jobService = new JobService(jobRepository);

// Create a companyRepository for the service to access
const companyRepository = new CompanyRepository();
export const companyService = new CompanyService(companyRepository);

const userRepository = new UserRepository();
export const userService = new UserService(userRepository);

const authRepository = new AuthRepository();
const passwordResetRepository = new PasswordResetRepository();
export const authService = new AuthService(
  authRepository,
  userRepository,
  passwordResetRepository
);
// This limiter helps set limits on api calls
const limiter = rateLimit({ limit: 100, windowMs: 15 * 60 * 100 });

// This helps parse json
app.use(express.json());
// This helps parses the incoming client request to set req.cookies
app.use(cookieParser());
// This helps with sorting, filtering, and pagination
app.use(hpp());
// This helps sanitize inputs from malicious html/js
app.use(xss());
// This helps with prevent clickjacking, MIME type sniffing, enforce https, prevent xss in older browsers
app.use(helmet());
// This helps if someone injects a script on your site via xss, contentSecurityPolicy can prevent the browser from running it
app.use(
  helmet.contentSecurityPolicy({
    directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'"] },
  })
);
// This helps to allow only trusted frontend urls to talk to server
app.use(cors({ origin: "http://localhost:5528", credentials: true }));
app.use(passport.initialize());

app.use("/api/names", limiter, namesRouter);
app.use("/api/jobs", limiter, jobsRouter);
app.use("/api/company", limiter, companyRouter);
app.use("/api/user", limiter, userRouter);
app.use("/api/auth", authRouter);
app.use("/", mainRouter);
app.use("/test", testSiteRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Server running on http://localhost:5528");
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
