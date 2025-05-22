import express from "express";
import {
  createUser,
  getUsers,
  createStore,
  getStores,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/users", authMiddleware(["ADMIN"]), createUser);
router.get("/users", authMiddleware(["ADMIN"]), getUsers);
router.post("/stores", authMiddleware(["ADMIN"]), createStore);
router.get("/stores", authMiddleware(["ADMIN"]), getStores);
router.get("/dashboard", authMiddleware(["ADMIN"]), getDashboardStats);

export default router;
