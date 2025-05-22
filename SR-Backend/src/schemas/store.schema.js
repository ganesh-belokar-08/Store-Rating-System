import { z } from "zod";

const createStoreSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters")
    .max(60, "Name must be at most 60 characters"),
  email: z.string().email("Invalid email format"),
  address: z.string().max(400, "Address must be at most 400 characters"),
  ownerId: z.number().int().positive(),
});

const storeFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  sortBy: z.enum(["name", "email"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export { createStoreSchema, storeFilterSchema };
