const user = require("../models/userModel");
const admin = require("../models/adminModel");

const getUserByID = async (req, res) => {
  try {
    let data;
      // console.log("req.user =>", req.user);


    if (req.user.role === "ADMIN") {
      data = await admin
        .findById(req.user.id)
        .select("-password");
    } else {
      data = await user
        .findById(req.user.id)
        .select("-password");
    }

    if (!data) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = getUserByID;