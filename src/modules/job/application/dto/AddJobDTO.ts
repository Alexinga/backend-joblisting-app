export type AddJobDTO = {
  title: string;
  description: string;
  salary: number;
  jobType: string;
  position: string;
  companyId: number | null;
  location: {
    city: string;
    state: string;
    country: string;
  } | null;
  contact: {
    name: string;
    email: string;
    phoneNumber: string;
  } | null;
};
