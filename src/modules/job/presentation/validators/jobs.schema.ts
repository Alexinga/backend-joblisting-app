import z from "zod";

export const addJobSchema = z.object({
  //   id: z.number(),
  //   createdAt: z.date(),
  title: z.string(),
  description: z.string(),
  // locationId: z.number().nullable(),
  // locationId: z.number().optional(),
  location: z.object({
    //   id: z.number(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    // jobId: z.number(),
  }),
  salary: z.number(),
  jobType: z.string(),
  position: z.string(),
  contact: z.object({
    //   id: z.number(),
    email: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    //   jobId: z.number(),
  }),
  companyId: z.number(),
  // company: z
  //   .object({
  //     //   id: z.number(),
  //     name: z.string(),
  //     //   createdAt: z.date(),
  //   })
  //   .optional(),
});

export type AddJobTypes = z.infer<typeof addJobSchema>;

export const updateJobSchema = z.object({
  // id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z
    .object({
      city: z.string(),
      state: z.string(),
      country: z.string(),
    })
    .optional(),
  salary: z.number().optional(),
  jobType: z.string().optional(),
  position: z.string().optional(),
  contact: z
    .object({
      email: z.string(),
      name: z.string(),
      phoneNumber: z.string(),
    })
    .optional(),
});

export const updateJobIdSchema = z.object({
  id: z.coerce.number(),
});

export type UpdateJobTypes = z.infer<typeof updateJobSchema>;

export const deleteJobSchema = z.object({
  id: z.number(),
});

export type DeleteJobTypes = z.infer<typeof deleteJobSchema>;
