import express from "express";
import {
  getRatings,
  getAverageRating,
  createStore,
} from "../controllers/store-owner.controller.js";
import authMiddleware from "../middleware/auth.js";
import { storeValidationRules } from "../validators/store.validators.js";
import { validate } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.get("/ratings", authMiddleware(["STORE_OWNER"]), getRatings);
router.get(
  "/average-rating",
  authMiddleware(["STORE_OWNER"]),
  getAverageRating
);

router.post(
  "/create-store",
  authMiddleware(["STORE_OWNER"]),
  storeValidationRules,
  validate,
  createStore
);

export default router;
