const user = require("../models/userModel");

const fetchAllUser = async (req, res) => {
    try {
        const data = await user.find().select("-password");

        return res.status(200).json({
            message: "did you get all user data",
            data
        });
    } catch (e) {
        console.error(e);

        return res.status(500).json({
            message: "Error while fetching all users"
        });
    }
};

module.exports = fetchAllUser;