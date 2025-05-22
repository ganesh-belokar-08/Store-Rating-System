import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import emailService from "./email.service.js";

class AuthService {
  async register(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      ...data,
      password: hashedPassword,
      role: "USER", // Always USER for normal registration
    });

    await emailService.sendWelcomeEmail(user.email, user.name);

    return { message: "User registered successfully" };
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    console.log("User found:", user?.email);
    console.log("Stored hash:", user?.password);
    console.log("Provided password:", password);

    const passwordMatch =
      user && (await bcrypt.compare(password, user.password));
    console.log("Password match?", passwordMatch);

    if (!user || !passwordMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { access_token: token };
  }

  async updatePassword(userId, { oldPassword, newPassword }) {
    const user = await User.findByPk(userId);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error("Invalid old password");
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await emailService.sendPasswordUpdateEmail(user.email, user.name);

    return { message: "Password updated successfully" };
  }
}

export default new AuthService();
