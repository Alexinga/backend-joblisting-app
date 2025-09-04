import { Router } from "express";
import { catchAsync } from "../../../../core/utils/error/catchAsync";

import uploadCompanyImage from "../../../../core/config/multer";
import {
  addCompanyData,
  deleteCompanyData,
  getCompanyData,
  updateCompanyData,
} from "../controller/company.controller";

const router = Router();
router.get("/", catchAsync(getCompanyData));
router.post(
  "/",
  uploadCompanyImage.fields([
    // create the name of file and the count to submit
    { name: "logo", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  //   uploadCompanyImage.single("image"),
  catchAsync(addCompanyData)
);
router.put("/:id", catchAsync(updateCompanyData));
router.delete("/:id", catchAsync(deleteCompanyData));

export default router;
