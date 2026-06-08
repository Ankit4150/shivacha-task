const mongoose = require("mongoose");

module.exports = async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect("mongodb://127.0.0.1:27017/employeeDBy");

  console.log("MongoDB Connected");
};






