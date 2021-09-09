import nodemailer from "nodemailer";

class EmailService {
  async sendMail(email, token) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_KEY,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Forgot password link",
      text: `Your forgot password http://localhost:9000/api/forgot-password/${token}`,
    };

    return await transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
