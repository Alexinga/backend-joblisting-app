import { JobEntity } from "../entities/jobEntity";
import { AddJobDomainModel } from "../models/addJob.model";
import { GetJobDomainModel, GetJobPromiseModel } from "../models/getJob.model";
import { UpdateJobDomainModel } from "../models/updateJob.model";
import { DeleteJobDomainModel } from "../models/deleteJob.model";

// This is the DOMAIN LAYER an ABSTRACTION of PERSISTENCE defined by what your business needs
export interface IJobRepository {
  getJobPaginatedSortedFilteredInterface(
    params: GetJobDomainModel
  ): Promise<GetJobPromiseModel>;

  addJobInterface(params: AddJobDomainModel): Promise<JobEntity>;

  updateJobInterface(params: UpdateJobDomainModel): Promise<JobEntity>;

  deleteJobInterface(params: DeleteJobDomainModel): Promise<JobEntity>;
}
