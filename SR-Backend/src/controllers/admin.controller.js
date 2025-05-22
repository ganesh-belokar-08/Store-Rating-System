import { z } from "zod";
import {
  createUserSchema,
  userFilterSchema,
  createStoreOwnerSchema,
} from "../schemas/user.schema.js";
import {
  createStoreSchema,
  storeFilterSchema,
} from "../schemas/store.schema.js";
import adminService from "../services/admin.service.js";

export const createUser = async (req, res, next) => {
  try {
    // Inject default role if not provided
    const payload = { ...req.body, role: "USER" };

    createUserSchema.parse(payload);

    const result = await adminService.createUser(payload);
    res.status(201).json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError
        ? new Error(
            error.errors.map((e) => `${e.path[0]}: ${e.message}`).join(", ")
          )
        : error
    );
  }
};

export const createStoreOwner = async (req, res, next) => {
  try {
    createStoreOwnerSchema.parse(req.body);
    const userData = {
      ...req.body,
      name: req.body.name || "Store Owner",
      address: req.body.address || "Not provided",
    };
    const result = await adminService.createStoreOwner(userData);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    if (error.message === "A user with this email already exists.") {
      return res.status(409).json({ message: "User already exists" });
    }
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    userFilterSchema.parse(req.query);
    const users = await adminService.getUsers(req.query);
    res.json(users);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const createStore = async (req, res, next) => {
  try {
    createStoreSchema.parse(req.body);
    const result = await adminService.createStore(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const getStores = async (req, res, next) => {
  try {
    storeFilterSchema.parse(req.query);
    const stores = await adminService.getStores(req.query);
    res.json(stores);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
