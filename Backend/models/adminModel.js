const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
        type: String,
        default: 'ADMIN'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", AdminSchema);