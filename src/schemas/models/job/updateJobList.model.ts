export type UpdateJobListModel = {
  id: number;
  title?: string;
  description?: string;
  salary?: number;
  jobType?: string;
  position?: string;
  contact?: {
    name?: string;
    phoneNumber?: string;
    email?: string;
  };
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
};
