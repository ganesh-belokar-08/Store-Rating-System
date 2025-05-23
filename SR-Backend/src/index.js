import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import storeOwnerRoutes from "./routes/store-owner.routes.js";
import errorMiddleware from "./middleware/error.js";
import associations from "./models/associations.js";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*", // Allow all origins for testing; adjust for production
    credentials: true, // Allow cookies to be sent
  })
);

// Parse JSON bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log("Incoming Request - Method:", req.method);
  console.log("Incoming Request - URL:", req.url);
  console.log("Incoming Request - Headers:", req.headers);
  console.log("Incoming Request - Body (Before Parsing):", req.body);
  next();
});

// Fallback to parse raw body if express.json() fails
app.use(express.raw({ type: "application/json" }));
app.use((req, res, next) => {
  if (
    req.headers["content-type"] === "application/json" &&
    Buffer.isBuffer(req.body)
  ) {
    try {
      req.body = JSON.parse(req.body.toString());
      console.log("Manually Parsed Body:", req.body);
    } catch (error) {
      console.error("Manual Parsing Error:", error);
      return res.status(400).json({ message: "Invalid JSON body" });
    }
  }
  next();
});

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
async function startServer() {
  try {
    // Sync each model individually to handle index errors gracefully
    for (const model of Object.values(associations)) {
      try {
        await model.sync({ force: false, alter: true }); // Use alter: true to update schema safely
        console.log(`Model ${model.name} synced successfully`);
      } catch (error) {
        if (
          error.name === "SequelizeDatabaseError" &&
          error.parent.code === "42P07"
        ) {
          console.warn(
            `Index already exists for ${model.name}, skipping: ${error.message}`
          );
          continue; // Skip duplicate index errors
        }
        throw error; // Rethrow other errors
      }
    }
    console.log("Database synced successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit on critical errors
  }
}

startServer();
