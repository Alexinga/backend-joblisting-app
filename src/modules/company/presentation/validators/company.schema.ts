import z from "zod";

export const addCompanyInfo = z.object({
  name: z.string(),
  // companyImage: z.file().optional(),
  // gallery: z.file().optional(),
  companyImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

// only the fields that can be updated from request body
export const updateCompanyInfo = z.object({
  // id: z.number(),
  name: z.string().optional(),
  // companyImage: z.file().optional(),
  // gallery: z.file().optional(),
  companyImage: z.string().optional(),
  gallery: z.array(z.string()).optional(),
});

export const updateCompanyIdParam = z.object({
  id: z.coerce.number(),
});
// Service and Repository actually need from body + url params
export const updateCompanyInfoInput = z.object({
  id: updateCompanyIdParam,
  data: updateCompanyInfo,
});

export const deleteCompanyInput = z.object({
  id: z.coerce.number(),
});

export type AddCompanyInfoType = z.infer<typeof addCompanyInfo>;

export type UpdateCompanyInfoType = z.infer<typeof updateCompanyInfo>;

export type UpdateCompanyInfoInputType = z.infer<typeof updateCompanyInfoInput>;
