import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const nodemailer_email = process.env.NODEMAILER_EMAIL;
const nodemailer_password = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: nodemailer_email,
    pass: nodemailer_password,
  },
});
const generateOtp = (userMail, message, subject, res) => {
  const otp = parseInt((Math.random() * 1000000).toString(), 10);
  const globalData = otp;

  // Store the OTP in localStorage with a key

  const mailOptions = {
    from: nodemailer_email,
    to: userMail,
    subject: subject,
    html:
      "<h3>" +
      message +
      "</h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Email sending failed" });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
  return globalData;
};
export default generateOtp;
