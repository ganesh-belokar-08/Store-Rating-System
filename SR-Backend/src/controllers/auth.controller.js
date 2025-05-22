import { z } from "zod";
import {
  registerSchema,
  loginSchema,
  updatePasswordSchema,
} from "../schemas/auth.schema.js";
import authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const login = async (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    const result = await authService.login(req.body);

    res.cookie("token", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    updatePasswordSchema.parse(req.body);
    const result = await authService.updatePassword(req.user.id, req.body);
    res.json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
