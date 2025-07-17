const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    return { success: true, message: "Connected to DB Successfully" };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong while connecting to DB",
    };
  }
};

module.exports = connectDB;
