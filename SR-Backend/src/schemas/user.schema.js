import { z } from "zod";

export const createUserSchema = z.object({
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
  role: z.enum(["ADMIN", "USER", "STORE_OWNER"]).optional(),
});

export const userFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  role: z.enum(["ADMIN", "USER", "STORE_OWNER"]).optional(),
  sortBy: z.enum(["name", "email", "address"]).optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
});

export const createStoreOwnerSchema = z.object({
  name: z
    .string()
    .min(20, "Name must be at least 20 characters")
    .max(60, "Name must be at most 60 characters")
    .optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  address: z
    .string()
    .max(400, "Address must be under 400 characters")
    .optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
