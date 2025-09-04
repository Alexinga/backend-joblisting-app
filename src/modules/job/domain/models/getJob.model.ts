import { Prisma } from "../../../../generated/prisma";
import { JobEntity } from "../entities/jobEntity";

export type GetJobPromiseModel = {
  entityJobs: JobEntity[];
  totalJob: number;
  totalPage: number;
  page: number;
  sort: Prisma.SortOrder;
  limit: number;
};

export type GetJobDomainModel = {
  page: number;
  limit: number;
  sort: "asc" | "desc";
  title?: string;
  city?: string;
};
