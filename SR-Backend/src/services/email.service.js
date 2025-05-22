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

  async sendAdminCreatedEmail(to, name, plainPassword) {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Welcome to StoreRater – Your Account is Ready!",
        text: `Hi ${name},
  
  Welcome to StoreRater! Your account has been successfully created by our system administrator.
  
  You can now log in using the following credentials:
  
  Email: ${to}
  Temporary Password: ${plainPassword}
  
  ⚠️ Please log in and change your password immediately for security reasons.
  
  If you face any issues, feel free to reach out to our support team.
  
  Thanks,  
  StoreRater Team`,
      });
    } catch (error) {
      console.error("Error sending admin-created email:", error);
      throw new Error("Failed to send welcome email");
    }
  }

  async sendStoreOwnerCredentials(email, name, credentials) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your StoreRater Store Owner Account Details",
      text: `Hello ${name},\n\nYour Store Owner account has been created by an admin.\n\nHere are your login credentials:\nEmail: ${credentials.email}\nPassword: ${credentials.password}\n\nPlease log in and change your password for security.\n\nBest regards,\nStoreRater Team`,
    };
    await transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
