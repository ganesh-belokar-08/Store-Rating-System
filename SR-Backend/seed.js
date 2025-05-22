import { sequelize } from "./src/config/database.js";
import User from "./src/models/user.model.js";
import bcrypt from "bcrypt";

const seedDatabase = async () => {
  try {
    // Sync the database (ensure tables exist, but don't drop them)
    await sequelize.sync({ force: false });

    // Admin user details
    const adminEmail = "admin@storerater.com";
    const adminPassword = "AdminPassword@1234"; // Meets validation: 8-16 chars, uppercase, special char
    const adminData = {
      name: "System Administrator Primary", // 26 chars, within 20-60
      email: adminEmail,
      address: "123 Admin Avenue, City, Country", // Under 400 chars
      password: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
    };

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (existingAdmin) {
      console.log(
        `Admin user with email ${adminEmail} already exists. Updating...`
      );
      await existingAdmin.update(adminData);
      console.log("Admin user updated successfully.");
    } else {
      await User.create(adminData);
      console.log("Admin user created successfully.");
    }

    console.log("Database seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

// Run the seed script
seedDatabase();
