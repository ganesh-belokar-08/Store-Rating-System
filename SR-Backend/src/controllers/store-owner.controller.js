import storeOwnerService from "../services/store-owner.service.js";
import Store from "../models/store.model.js";

export const getRatings = async (req, res, next) => {
  try {
    const ratings = await storeOwnerService.getRatings(req.user.id);
    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

export const getAverageRating = async (req, res, next) => {
  try {
    const result = await storeOwnerService.getAverageRating(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//import Store from "../models/store.model.js";

export const createStore = async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const ownerId = req.user.id;

    // Check if owner already has a store
    const existingStore = await Store.findOne({ where: { ownerId } });
    if (existingStore) {
      return res
        .status(400)
        .json({ message: "You have already registered a store." });
    }

    // Check if email is already used
    const existingEmail = await Store.findOne({ where: { email } });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "A store with this email already exists." });
    }

    // Create new store
    const newStore = await Store.create({ name, email, address, ownerId });

    res.status(201).json({
      message: "Store registered successfully.",
      store: newStore,
    });
  } catch (error) {
    console.error("Error registering store:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
