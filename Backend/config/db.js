import mongoose from "mongoose";

const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("✅ MongoDB Connected Sucessfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1); // Stop server if DB connection fails
  }
};

export default connectedDB;
