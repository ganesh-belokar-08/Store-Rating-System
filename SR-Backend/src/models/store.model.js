import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [20, 60],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [0, 400],
      },
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "users", // Use table name as string
        key: "id",
      },
      onDelete: "RESTRICT",
    },
  },
  {
    timestamps: true,
    tableName: "stores",
    indexes: [
      { fields: ["name"] },
      { fields: ["email"] },
      { fields: ["ownerId"] },
    ],
  }
);

export default Store;
