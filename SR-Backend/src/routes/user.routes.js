import express from "express";
import {
  getStores,
  submitRating,
  updateRating,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware(["USER"]), getStores);
router.post("/ratings", authMiddleware(["USER"]), submitRating);
router.patch("/ratings/:id", authMiddleware(["USER"]), updateRating);

export default router;
