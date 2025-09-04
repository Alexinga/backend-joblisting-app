import z from "zod";

export const paginationSortFilterSchema = z.object({
  page: z
    .string()
    .transform(Number)
    .default(1)
    .refine((pageNum) => pageNum > 0),

  limit: z
    .string()
    .transform(Number)
    .default(5)
    .refine((limitNum) => limitNum > 0 && limitNum <= 100),
  sort: z.enum(["asc", "desc"]).default("desc"),
  title: z.string().optional(),
  city: z.string().optional(),
});

export type QueryParamTypes = z.infer<typeof paginationSortFilterSchema>;
