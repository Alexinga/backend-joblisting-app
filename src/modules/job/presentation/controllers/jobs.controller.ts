import { Request, Response } from "express";
import {
  addJobSchema,
  deleteJobSchema,
  updateJobIdSchema,
  updateJobSchema,
} from "../validators/jobs.schema";
import {
  validateBody,
  validateParam,
  validateQuery,
} from "../../../../core/utils/zodValidation/zodUtils";
import { paginationSortFilterSchema } from "../validators/pagination.schema";
import { jobService } from "../../../../server";

// This is the PRESENTATION LAYER and this shows where the data can shown as a response back to the client

export const getJobs = async (req: Request, res: Response) => {
  const parsedData = validateQuery(paginationSortFilterSchema, req);
  if (!parsedData) return;
  const paginatedResult = await jobService.getJobPaginatedSortedFiltered(
    parsedData
  );

  res.status(200).json({
    status: "success",
    data: paginatedResult.entityJobs,
    meta: {
      totalJobs: paginatedResult.totalJob,
      totalPage: paginatedResult.totalPage,
      currentPage: paginatedResult.page,
      limit: paginatedResult.limit,
      sort: paginatedResult.sort,
    },
  });
};

export const addJob = async (req: Request, res: Response) => {
  const parsedData = validateBody(addJobSchema, req, res);
  if (!parsedData) return;

  const newJob = await jobService.addJobList(parsedData);

  res
    .status(201)
    .json({ message: "Successfully created new job", data: newJob });
};

export const updateJob = async (req: Request, res: Response) => {
  const parsedData = validateBody(updateJobSchema, req, res);
  if (!parsedData) return;

  const parsedParam = validateParam(updateJobIdSchema, req);
  if (!parsedParam) return;
  const jobId = parsedParam.id;

  const updateJob = await jobService.updateJobList({
    id: jobId,
    data: parsedData,
  });

  res
    .status(200)
    .json({ message: "Successfully updated field", data: updateJob });
};

export const deleteJob = async (req: Request, res: Response) => {
  const parsedResult = validateBody(deleteJobSchema, req, res);
  if (!parsedResult) return;
  const deleteJob = await jobService.deleteJobList(parsedResult);
  res
    .status(200)
    .json({ message: "Successfully deleted job", data: deleteJob });
};
