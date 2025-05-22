import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import User from "./user.model.js";
import Store from "./store.model.js";

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Store,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    timestamps: true,
    indexes: [
      { fields: ["storeId"] },
      { fields: ["userId"] },
      { unique: true, fields: ["storeId", "userId"] },
    ],
  }
);

Rating.belongsTo(Store, { foreignKey: "storeId" });
Rating.belongsTo(User, { foreignKey: "userId" });
Store.hasMany(Rating, { foreignKey: "storeId" });
User.hasMany(Rating, { foreignKey: "userId" });

export default Rating;
