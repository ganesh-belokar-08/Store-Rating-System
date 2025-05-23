import User from "./user.model.js";
import Store from "./store.model.js";
import Rating from "./rating.model.js";

// Rating belongs to one Store
Rating.belongsTo(Store, { foreignKey: "storeId", as: "Store" });

// Rating belongs to one User
Rating.belongsTo(User, { foreignKey: "userId", as: "User" });

// Store has many Ratings (all ratings for average etc)
Store.hasMany(Rating, { foreignKey: "storeId", as: "AllRatings" });

// Store has many Ratings (for user's submitted rating)
Store.hasMany(Rating, { foreignKey: "storeId", as: "UserRating" });

// Store belongs to its owner
Store.belongsTo(User, { foreignKey: "ownerId", as: "Owner" });

// User has many Ratings (to get user's ratings)
User.hasMany(Rating, { foreignKey: "userId", as: "Ratings" });

// User has one Store (if they are a STORE_OWNER)
User.hasOne(Store, { foreignKey: "ownerId", as: "Store" });

export default { User, Store, Rating };
