const user = require('../models/userModel')

const getUserByID = async (req, res) => {
    try {
        const data = await user
            .findById(req.user.id)
            .select("-password");

        if (!data) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            data
        });

    } catch (e) {
        console.error(e);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = getUserByID;