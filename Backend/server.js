import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectedDB from "./config/db.js";
import passport from "passport";
import "./config/passport.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import productRoutes from "./routes/productRoutes.js";
import { ContactSendEmail } from "./controllers/ContactSendEmail.js";
import { chatController } from "./controllers/chatController.js";
import chatRoutes from "./routes/chatRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS setup for Render
const allowedOrigins = [
  process.env.CLIENT_URL || "https://kachabazar-ui.onrender.com",
  "http://localhost:5173", // for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", ContactSendEmail);
app.post("/api/chat", chatController);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("✅ Kachabazar backend is running fine 🚀");
});

// ✅ Mongo + Server Start
const PORT = process.env.PORT || 4747;
const startServer = async () => {
  try {
    await connectedDB();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};
startServer();
