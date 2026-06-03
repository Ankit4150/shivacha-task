const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://hs348961_db_user:hT1dGIaysmI4HEj0@cluster0.ufil94v.mongodb.net/?appName=Cluster0";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;