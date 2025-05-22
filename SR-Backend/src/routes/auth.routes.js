import express from "express";
import {
  register,
  login,
  updatePassword,
  logout,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch(
  "/update-password",
  authMiddleware(["USER", "STORE_OWNER"]),
  updatePassword
);

router.post(
  "/logout",
  authMiddleware(["USER", "STORE_OWNER", "ADMIN"]),
  logout
);

export default router;
