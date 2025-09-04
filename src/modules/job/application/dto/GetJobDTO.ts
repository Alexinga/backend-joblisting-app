export type GetJobDTO = {
  page: number;
  limit: number;
  sort: "asc" | "desc";
  title?: string;
  city?: string;
};
