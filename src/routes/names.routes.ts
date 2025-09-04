import { Router } from "express";
import {
  addName,
  deleteName,
  getAllNames,
  updateName,
} from "../controllers/names.controller";
const router = Router();

router.get("/", getAllNames);
router.post("/", addName);
router.put("/", updateName);
router.delete("/", deleteName);

export default router;
