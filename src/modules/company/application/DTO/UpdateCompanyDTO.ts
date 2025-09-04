export type UpdateCompanyDTO = {
  id: number;
  data: {
    name?: string;
    companyImage?: string;
    gallery?: string[];
  };
};
