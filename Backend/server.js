import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { ContactSendEmail } from "./controllers/ContactSendEmail.js";
import { chatController } from "./controllers/chatController.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();


// ✅ VERY IMPORTANT — CORS HANDLER (ONLY THIS, no cors package)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://kachabazar-frontend-ebon.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: "secretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


// ✅ MongoDB connection (serverless safe)
let isDBConnected = false;
const connectIfNeeded = async () => {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
  }
};
await connectIfNeeded();


// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", ContactSendEmail);
app.post("/api/chat", chatController);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);


// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Backend running on Vercel");
});

export default app;
