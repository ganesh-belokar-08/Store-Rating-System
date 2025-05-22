import { z } from "zod";

const createRatingSchema = z.object({
  storeId: z.number().int().positive(),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
});

const storeFilterSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  sortBy: z.enum(["name", "address"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export { createRatingSchema, storeFilterSchema };
