import { z } from "zod";
import { createUserSchema, userFilterSchema } from "../schemas/user.schema.js";
import {
  createStoreSchema,
  storeFilterSchema,
} from "../schemas/store.schema.js";
import adminService from "../services/admin.service.js";

const createUser = async (req, res, next) => {
  try {
    createUserSchema.parse(req.body);
    const result = await adminService.createUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(
      error instanceof z.ZodError ? new Error(error.errors[0].message) : error
    );
  }
};

const getUsers = async (req, res, next) => {
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

const createStore = async (req, res, next) => {
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

const getStores = async (req, res, next) => {
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

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

export { createUser, getUsers, createStore, getStores, getDashboardStats };
