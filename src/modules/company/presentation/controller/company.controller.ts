import { Request, Response } from "express";

import { companyService } from "../../../../server";
import {
  validateBody,
  validateParam,
  validateQuery,
} from "../../../../core/utils/zodValidation/zodUtils";
import {
  addCompanyInfo,
  deleteCompanyInput,
  updateCompanyIdParam,
  updateCompanyInfo,
} from "../validators/company.schema";

export const getCompanyData = async (req: Request, res: Response) => {
  const companyData = await companyService.getCompanyData();
  res.status(200).json({ status: "success", data: companyData });
};

export const addCompanyData = async (req: Request, res: Response) => {
  const parsedData = validateBody(addCompanyInfo, req, res);
  if (!parsedData) return;
  // const filePath = req.file ? req.file.path : null;

  // need the files?.logo?.[0] to make adding code on REST client
  const logoFile = req.files?.logo?.[0];
  const galleryFile = req.files?.gallery;

  const companyImage = logoFile ? logoFile.filename : null;
  const gallery = galleryFile ? galleryFile.map((item) => item.filename) : [];

  const addCompanyData = await companyService.addCompanyData({
    name: parsedData.name,
    companyImage: companyImage,
    gallery: gallery,
  });

  res
    .status(201)
    .json({ message: "Successfully added company info", data: addCompanyData });
};

export const updateCompanyData = async (req: Request, res: Response) => {
  // Here we just updateCompanyInfo which is the body response no id in here
  const parsedData = validateBody(updateCompanyInfo, req, res);
  if (!parsedData) return;

  // Using query params to grab id from string and convert to number to pass for companyId
  const parsedParam = validateParam(updateCompanyIdParam, req);
  if (!parsedParam) return;

  const companyParamId = parsedParam.id;
  // updateCompanyData needs companyId and we are grabbing it from url parameters
  const updateCompanyData = await companyService.updateCompanyData({
    id: companyParamId,
    data: parsedData,
  });
  res.status(200).json({
    message: "Successfully updated company info",
    data: updateCompanyData,
  });
};

export const deleteCompanyData = async (req: Request, res: Response) => {
  const parsedData = validateParam(deleteCompanyInput, req);
  if (!parsedData) return;
  const deleteCompanyRecord = await companyService.deleteCompanyData(
    parsedData
  );
  res
    .status(200)
    .json({ message: "Successfully deleted", data: deleteCompanyRecord });
};

// export class CompanyController {
//   async getCompanyData(req: Request, res: Response) {
//     const companyData = await companyService.getCompanyData();
//     res.status(200).json({ message: "successful retrieve", data: companyData });
//   }
// }
