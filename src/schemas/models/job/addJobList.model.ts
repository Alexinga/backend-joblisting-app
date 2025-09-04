export type AddJobListSchema = {
  // id?: number;
  title: string;
  description: string;
  salary: number;
  jobType: string;
  companyId: number | null;
  position: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  contact?: {
    name: string;
    email: string;
    phoneNumber: string;
  };
};
