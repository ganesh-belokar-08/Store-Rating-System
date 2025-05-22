import express from "express";
import {
  getRatings,
  getAverageRating,
} from "../controllers/store-owner.controller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/ratings", authMiddleware(["STORE_OWNER"]), getRatings);
router.get(
  "/average-rating",
  authMiddleware(["STORE_OWNER"]),
  getAverageRating
);

export default router;
