const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    name: String,
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestCollection", testSchema);