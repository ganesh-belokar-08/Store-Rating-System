import storeOwnerService from "../services/store-owner.service.js";

const getRatings = async (req, res, next) => {
  try {
    const ratings = await storeOwnerService.getRatings(req.user.id);
    res.json(ratings);
  } catch (error) {
    next(error);
  }
};

const getAverageRating = async (req, res, next) => {
  try {
    const result = await storeOwnerService.getAverageRating(req.user.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export { getRatings, getAverageRating };
