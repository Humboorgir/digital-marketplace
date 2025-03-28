import z from "zod";

export const queryValidator = z.object({
  category: z.string().optional(),
  sort: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
});

export type QueryValidator = z.infer<typeof queryValidator>;
