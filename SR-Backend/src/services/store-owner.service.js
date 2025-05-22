import Store from "../models/store.model.js";
import Rating from "../models/rating.model.js";
import User from "../models/user.model.js";

class StoreOwnerService {
  async getRatings(userId) {
    const store = await Store.findOne({ where: { ownerId: userId } });
    if (!store) {
      throw new Error("Store not found for this owner");
    }

    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      include: [
        {
          model: User,
          attributes: ["name", "email"],
        },
      ],
      attributes: ["id", "rating", "createdAt"],
    });

    return ratings;
  }

  async getAverageRating(userId) {
    const store = await Store.findOne({ where: { ownerId: userId } });
    if (!store) {
      throw new Error("Store not found for this owner");
    }

    const ratings = await Rating.findAll({
      where: { storeId: store.id },
      attributes: ["rating"],
    });

    if (ratings.length === 0) {
      return { averageRating: null };
    }

    const average =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    return { averageRating: average.toFixed(1) };
  }
}

export default new StoreOwnerService();
