import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import storeOwnerRoutes from "./routes/store-owner.routes.js";
import errorMiddleware from "./middleware/error.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cookieParser()); // Add this before routes

// Health Check Endpoint
app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: "Database connection successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Database connection failed", error: error.message });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stores", userRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

// Error Handling
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  // Removed force: true
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
