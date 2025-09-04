import prisma from "../../../../prisma";
import { Prisma } from "../../../../generated/prisma";
import { IJobRepository } from "../../domain/repositories/IJobRepository";
import { JobEntity } from "../../domain/entities/jobEntity";
import { AddJobDomainModel } from "../../domain/models/addJob.model";
import { GetJobDomainModel } from "../../domain/models/getJob.model";
import { UpdateJobDomainModel } from "../../domain/models/updateJob.model";
import { DeleteJobDomainModel } from "../../domain/models/deleteJob.model";

// This is the INFRASTRUCTURE LAYER this is where it holds the prisma framework to perform calculations
export class JobRepository implements IJobRepository {
  async getJobPaginatedSortedFilteredInterface(params: GetJobDomainModel) {
    const { page, limit, sort, title, city } = params;
    const whereClause: Prisma.JobWhereInput = {};

    if (title) {
      whereClause.title = { contains: title, mode: "insensitive" };
    }

    if (city) {
      const locationClause: Prisma.LocationWhereInput = {};
      locationClause.city = { contains: city, mode: "insensitive" };
      whereClause.location = locationClause;
    }
    //1. calculate the skip of records
    const skip = (page - 1) * limit;

    //2. use prisma to fetch both the data and the total count this is where $transaction helps out
    // This ensures both queries are executed against the same state of the database.

    const [jobs, totalJob] = await prisma.$transaction([
      prisma.job.findMany({
        // 3. select only the 'title' field as requested.
        //   select: {
        //     id: true, // good practice to include Id
        //     title: true,
        //   },
        where: whereClause,
        include: {
          contact: true,
          location: true,
        },
        // 4. apply pagination
        // 6. Apply sorting here
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: sort,
        },
      }),
      prisma.job.count({ where: whereClause }), // 5. get the total count of all jobs and need where if you are filtering out as well
    ]);

    const entityJobs = jobs.map((job) => {
      return new JobEntity(
        job.id,
        job.createdAt,
        job.title,
        job.description,
        job.salary,
        job.jobType,
        job.position,
        job.companyId,
        job.location,
        job.locationId,
        job.contact
      );
    });

    return {
      entityJobs,
      totalJob,
      totalPage: Math.ceil(totalJob / limit),
      page,
      sort,
      limit,
    };
  }
  async addJobInterface(params: AddJobDomainModel) {
    const {
      title,
      description,
      salary,
      position,
      jobType,
      companyId,
      location,
      contact,
    } = params;

    const newJobList = await prisma.job.create({
      data: {
        title: title,
        description: description,
        salary: salary,
        position: position,
        jobType: jobType,
        company: {
          connect: {
            id: companyId!,
          },
        },

        ...(location && {
          location: {
            create: {
              city: location.city,
              state: location.state,
              country: location.country,
            },
          },
        }),
        ...(contact && {
          contact: {
            create: {
              name: contact.name,
              phoneNumber: contact.phoneNumber,
              email: contact.email,
            },
          },
        }),
      },
      include: {
        location: true,
        contact: true,
      },
    });

    return new JobEntity(
      newJobList.id,
      newJobList.createdAt,
      newJobList.title,
      newJobList.description,
      newJobList.salary,
      newJobList.jobType,
      newJobList.position,
      newJobList.companyId,
      newJobList.location,
      newJobList.locationId,
      newJobList.contact
    );
  }

  async updateJobInterface(params: UpdateJobDomainModel) {
    const { id, location, contact, ...updateFields } = params;

    const updateJobDb = await prisma.job.update({
      where: {
        id: id,
      },
      data: {
        ...updateFields,
        ...(contact && {
          contact: {
            update: {
              name: contact.name,
              email: contact.email,
              phoneNumber: contact.phoneNumber,
            },
          },
        }),
        ...(location && {
          location: {
            update: {
              city: location.city,
              state: location.state,
              country: location.country,
            },
          },
        }),
      },
      include: {
        location: true,
        contact: true,
      },
    });

    return new JobEntity(
      updateJobDb.id,
      updateJobDb.createdAt,
      updateJobDb.title,
      updateJobDb.description,
      updateJobDb.salary,
      updateJobDb.jobType,
      updateJobDb.position,
      updateJobDb.companyId,
      updateJobDb.location,
      updateJobDb.locationId,
      updateJobDb.contact
    );
  }

  async deleteJobInterface(params: DeleteJobDomainModel) {
    const { id } = params;
    const deleteJobDb = await prisma.job.delete({
      where: {
        id: id,
      },
      include: {
        location: true,
        contact: true,
      },
    });

    return new JobEntity(
      deleteJobDb.id,
      deleteJobDb.createdAt,
      deleteJobDb.title,
      deleteJobDb.description,
      deleteJobDb.salary,
      deleteJobDb.jobType,
      deleteJobDb.position,
      deleteJobDb.companyId,
      deleteJobDb.location,
      deleteJobDb.locationId,
      deleteJobDb.contact
    );
  }
}
