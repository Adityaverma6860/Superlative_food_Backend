require('dotenv').config();
const mongoose = require("mongoose");

const mongoURL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Superlative";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true, 
    });

    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1); 
  }

  mongoose.connection.on("disconnected", () => {
    console.log(" MongoDB disconnected");
  });
};

module.exports = connectDB;
