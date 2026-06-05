const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
     name: {
      type: String,
      required: true,
    },
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
    },
    status: {
        type: String,
        default: "ACTIVE",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);