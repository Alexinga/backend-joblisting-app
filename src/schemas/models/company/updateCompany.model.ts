import { Prisma } from "../../../generated/prisma";

export type UpdateCompanyModel = {
  // id: number;
  name: string | null;
  companyImage: string | null;
  gallery: string[] | null;
};

// Instead of writing out the manual model when can dynamically connect prisma for it
export type UpdateCompanyModelPrisma = Prisma.CompanyUpdateInput;
