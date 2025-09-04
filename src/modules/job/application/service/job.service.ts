import { IJobRepository } from "../../domain/repositories/IJobRepository";
import { AddJobDTO } from "../dto/AddJobDTO";
import { UpdateJobDTO } from "../dto/UpdateJobDTO";
import { GetJobDTO } from "../dto/GetJobDTO";
import { DeleteJobDTO } from "../dto/DeleteJobDTO";

// have a query parameter of /jobs?page=2&limit=5

// This is the APPLICATION LAYER this is where it can hold logic like default pagination, apply business rules, combine multiple repositories

export class JobService {
  constructor(private jobRepo: IJobRepository) {}
  async getJobPaginatedSortedFiltered(params: GetJobDTO) {
    return this.jobRepo.getJobPaginatedSortedFilteredInterface(params);
  }
  async addJobList(params: AddJobDTO) {
    return this.jobRepo.addJobInterface(params);
  }

  async updateJobList(params: UpdateJobDTO) {
    return this.jobRepo.updateJobInterface(params);
  }

  async deleteJobList(params: DeleteJobDTO) {
    return this.jobRepo.deleteJobInterface(params);
  }
}
