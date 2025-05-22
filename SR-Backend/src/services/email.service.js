import transporter from "../config/nodemailer.js";

class EmailService {
  async sendWelcomeEmail(to, name) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Welcome to StoreRater!",
        text: `Hi ${name},\n\nYour account has been created successfully! We're excited to have you on board.`,
      });
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }
  }

  async sendPasswordUpdateEmail(to, name) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Password Updated",
        text: `Hi ${name},\n\nYour password has been updated successfully! If you did not make this change, please contact support.`,
      });
    } catch (error) {
      console.error("Error sending password update email:", error);
      throw new Error("Failed to send password update email");
    }
  }

  async sendAdminCreatedEmail(to, name) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Account Created by Admin",
        text: `Hi ${name},\n\nYour account has been created by an admin! Welcome to StoreRater.`,
      });
    } catch (error) {
      console.error("Error sending admin created email:", error);
      throw new Error("Failed to send admin created email");
    }
  }
}

export default new EmailService();
