import User from "../models/user.model.js";
import Store from "../models/store.model.js";
import Rating from "../models/rating.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import emailService from "./email.service.js";

class AdminService {
  async createUser(data) {
    const plainPassword = data.password; // Store plain password to send in email
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    await emailService.sendAdminCreatedEmail(
      user.email,
      user.name,
      plainPassword
    );

    return { message: "User created successfully" };
  }

  async createStoreOwner(data) {
    const { name, email, address, password } = data;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      address,
      password: hashedPassword,
      role: "STORE_OWNER",
    });

    await emailService.sendStoreOwnerCredentials(email, name, {
      email,
      password,
    });

    return { message: "Store Owner created successfully" };
  }

  async createStore(data) {
    const user = await User.findByPk(data.ownerId);
    if (!user || user.role !== "STORE_OWNER") {
      throw new Error("Invalid or non-store-owner user");
    }
    const store = await Store.create(data);
    return { message: "Store created successfully", storeId: store.id };
  }

  async getUsers(filters) {
    const where = {};
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
    if (filters.email) where.email = { [Op.iLike]: `%${filters.email}%` };
    if (filters.address) where.address = { [Op.iLike]: `%${filters.address}%` };
    if (filters.role) where.role = filters.role;

    const order = filters.sortBy
      ? [[filters.sortBy, filters.sortOrder || "ASC"]]
      : [];

    const users = await User.findAll({
      where,
      order,
      attributes: ["id", "name", "email", "address", "role"],
    });

    return users;
  }

  async getStores(filters) {
    const where = {};
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
    if (filters.email) where.email = { [Op.iLike]: `%${filters.email}%` };
    if (filters.address) where.address = { [Op.iLike]: `%${filters.address}%` };

    const order = filters.sortBy
      ? [[filters.sortBy, filters.sortOrder || "ASC"]]
      : [];

    const stores = await Store.findAll({
      where,
      order,
      attributes: ["id", "name", "email", "address"],
      include: [
        {
          model: Rating,
          as: "Ratings",
          attributes: ["rating"],
        },
      ],
      group: ["Store.id"],
      raw: true,
      nest: true,
    });

    const result = stores.map((store) => ({
      ...store,
      averageRating: store.Ratings.length
        ? (
            store.Ratings.reduce((sum, r) => sum + r.rating, 0) /
            store.Ratings.length
          ).toFixed(1)
        : null,
    }));

    return result;
  }

  async getDashboardStats() {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();
    return { totalUsers, totalStores, totalRatings };
  }
}

export default new AdminService();
