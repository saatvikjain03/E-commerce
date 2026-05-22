const express = require("express");
// mongoose removed: using Prisma (Postgres/Neon) instead
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("./middlewares/middleware");
const { connectDb } = require("./config/db");
const prisma = require("./prismaClient");
const subscribeRouter = require("./routes/subscription");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes")
const cors = require("cors");

require("dotenv").config();

connectDb();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: ["GET", "POST"],
  })
);

app.use('/api/user', userRoutes);

app.use(middleware);

app.get('/',(req,res)=>{
  res.send("working");
});

app.use("/api/orders", orderRoutes);
app.use("/api/subscribe", subscribeRouter);

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await prisma.contact.create({ data: { name, email, message } });
    console.log("Received contact form submission:", { name, email, message });
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact form submission:", error);
    res.status(500).json({ message: "Error saving form submission" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;