// import mongoose from "mongoose";

// const connectedDB = async () => {
//   try {
//     await mongoose.connect(process.env.MongoDB_URI);
//     console.log("✅ MongoDB Connected Sucessfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection failed", error);
//     process.exit(1); // Stop server if DB connection fails
//   }
// };

// export default connectedDB;


import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 MongoDB already connected");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MongoDB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    throw new Error("MongoDB Connection Failed");
  }
};

export default connectDB;

