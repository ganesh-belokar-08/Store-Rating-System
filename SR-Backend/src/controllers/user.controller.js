import { z } from "zod";
import {
  createRatingSchema,
  storeFilterSchema,
} from "../schemas/rating.schema.js";
import userService from "../services/user.service.js";

export const getStores = async (req, res, next) => {
  try {
    storeFilterSchema.parse(req.query);
    const stores = await userService.getStores(req.user.id, req.query);
    res.json(stores);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const submitRating = async (req, res, next) => {
  try {
    createRatingSchema.parse(req.body);
    const result = await userService.submitRating(req.user.id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const updateRating = async (req, res, next) => {
  try {
    const { rating } = createRatingSchema.parse(req.body);
    const result = await userService.updateRating(
      req.user.id,
      parseInt(req.params.id),
      { rating }
    );
    res.json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};
