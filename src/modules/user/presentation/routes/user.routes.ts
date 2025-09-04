import { Router } from "express";
import { catchAsync } from "../../../../core/utils/error/catchAsync";
import {
  createUserController,
  deleteUserController,
  readUserController,
  updateUserController,
} from "../controller/user.controller";

const router = Router();

router.get("/", catchAsync(readUserController));
router.post("/", catchAsync(createUserController));
router.put("/:id", catchAsync(updateUserController));
router.delete("/:id", catchAsync(deleteUserController));

export default router;
