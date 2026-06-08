const mongoose = require("mongoose");

module.exports = async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB Connected");
};






