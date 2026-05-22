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
  const { email, orderNumber, totalAmount, items } = req.body;

  if (!email || !orderNumber || !totalAmount || !items) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const itemList = items
    .map((item) => `<li>${item.name} - $${item.price}</li>`)
    .join("");

  const mailOptions = {
    from: `"ZOOSKO" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Order Confirmation",
    text: `Thank you for ordering on ZOOSKO! We'll keep you updated with your order.`,
    html: `<h1>Thank you for ordering on ZOOSKO!</h1><p>We'll keep you updated with the your order.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent to:", email);
    res.status(200).json({ message: "Confirmation email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending confirmation email." });
  }
});

module.exports = router;
