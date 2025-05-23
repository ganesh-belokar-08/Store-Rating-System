import Store from "../models/store.model.js";
import Rating from "../models/rating.model.js";
import { Op } from "sequelize";

class UserService {
  async getStores(userId, filters) {
    const where = {};
    if (filters.name) where.name = { [Op.iLike]: `%${filters.name}%` };
    if (filters.address) where.address = { [Op.iLike]: `%${filters.address}%` };

    const order = filters.sortBy
      ? [[filters.sortBy, filters.sortOrder || "ASC"]]
      : [];

    const stores = await Store.findAll({
      where,
      order,
      attributes: ["id", "name", "address"],
      include: [
        {
          model: Rating,
          as: "UserRating", // Alias for user-specific rating
          attributes: ["rating"],
          where: { userId },
          required: false,
        },
        {
          model: Rating,
          as: "AllRatings", // Alias for all ratings
          attributes: ["rating"],
        },
      ],
      group: ["Store.id", "UserRating.rating", "AllRatings.rating"], // Include aliases in group
      raw: true,
      nest: true,
    });

    const result = stores.map((store) => ({
      id: store.id,
      name: store.name,
      address: store.address,
      userRating: store.UserRating?.rating || null, // Use UserRating alias
      overallRating: store.AllRatings.length
        ? (
            store.AllRatings.reduce((sum, r) => sum + r.rating, 0) /
            store.AllRatings.length
          ).toFixed(1)
        : null,
    }));

    return result;
  }

  async submitRating(userId, { storeId, rating }) {
    const store = await Store.findByPk(storeId);
    if (!store) {
      throw new Error("Store not found");
    }

    const existingRating = await Rating.findOne({ where: { userId, storeId } });
    if (existingRating) {
      throw new Error("Rating already submitted. Use update instead.");
    }

    await Rating.create({ storeId, userId, rating });
    return { message: "Rating submitted successfully" };
  }

  async updateRating(userId, ratingId, { rating }) {
    const existingRating = await Rating.findOne({
      where: { id: ratingId, userId },
    });
    if (!existingRating) {
      throw new Error("Rating not found or not authorized");
    }

    existingRating.rating = rating;
    await existingRating.save();
    return { message: "Rating updated successfully" };
  }
}

export default new UserService();
