export type UpdateJobDTO = {
  id: number;
  data: {
    title?: string;
    description?: string;
    salary?: number;
    jobType?: string;
    position?: string;
    location?: { city: string; state: string; country: string };
    contact?: { name: string; email: string; phoneNumber: string };
  };
};
