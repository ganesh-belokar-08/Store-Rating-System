import { z } from "zod";

const registerSchema = z.object({
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
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const updatePasswordSchema = z.object({
  oldPassword: z.string(),
  newPassword: z
    .string()
    .min(8)
    .max(16)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

export { registerSchema, loginSchema, updatePasswordSchema };
