import { z } from "zod";

const createUserSchema = z.object({
  name: z.string().min(20).max(60),
  email: z.string().email(),
  address: z.string().max(400),
  password: z
    .string()
    .min(8)
    .max(16)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  role: z.enum(["ADMIN", "USER", "STORE_OWNER"]),
});

const userFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  role: z.enum(["ADMIN", "USER", "STORE_OWNER"]).optional(),
  sortBy: z.enum(["name", "email", "address"]).optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

export { createUserSchema, userFilterSchema };
