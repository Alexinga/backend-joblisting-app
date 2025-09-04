// export type GetJobServiceModel = {
//   page: number;
//   limit: number;
//   sort: "asc" | "desc";
//   title?: string;
//   city?: string;
// };

export type GetJobListModel = {
  location: {
    city: string;
    id: number;
    state: string;
    country: string;
  } | null;
  contact: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    jobId: number;
  } | null;
} & {
  title: string;
  description: string;
  salary: number;
  position: string;
  jobType: string;
  companyId: number | null;
  id: number;
  createdAt: Date;
  locationId: number | null;
};
