import { Router } from "express";
import {
  addJob,
  deleteJob,
  getJobs,
  updateJob,
} from "../controllers/jobs.controller";
import { catchAsync } from "../../../../core/utils/error/catchAsync";

const router = Router();
router.get("/", catchAsync(getJobs));
router.post("/", catchAsync(addJob));
router.put("/:id", catchAsync(updateJob));
router.delete("/:id", catchAsync(deleteJob));

export default router;
