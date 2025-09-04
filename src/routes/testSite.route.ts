import { Router } from "express";
import { authMiddleware } from "../core/middleware/auth.middleware";
import { adminTest, authTestSite } from "../controllers/testSite.controller";
import { restrictTo } from "../core/middleware/roles.middleware";

const router = Router();

router.get("/authTest", authMiddleware, authTestSite);

router.get("/adminTest", authMiddleware, restrictTo("admin"), adminTest);

export default router;
