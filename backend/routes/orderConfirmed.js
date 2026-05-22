const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await transporter.sendMail({
      from: `"ZOOSKO" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Order Confirmation",
      text: `Thank you for ordering on ZOOSKO! We'll keep you updated with your order.`,
      html: `<h1>Thank you for ordering on ZOOSKO!</h1><p>We'll keep you updated with the your order.</p>`,
    });

    console.log("order confirm email sent to:", email);
    res.status(200).json({ message: "Order successful!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending order email" });
  }
});

module.exports = router;
