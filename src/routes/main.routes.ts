import { Router } from "express";
import { home } from "../controllers/main.controller";

const router = Router();
router.get("/", home);

export default router;
