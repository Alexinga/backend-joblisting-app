export type UpdateCompanyDomainModel = {
  id: number;
  data: {
    name?: string;
    companyImage?: string;
    gallery?: string[];
  };
};
