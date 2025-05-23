import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

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
        model: "stores",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
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
    tableName: "ratings",
    indexes: [
      { fields: ["storeId"] },
      { fields: ["userId"] },
      { unique: true, fields: ["storeId", "userId"] },
    ],
  }
);

export default Rating;
