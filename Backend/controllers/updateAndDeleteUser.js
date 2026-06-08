const user = require('../models/userModel')

const updateUser = async (req, res) => {
   try {
        const { id } = req.params;
        const { name, username } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        if (!name || !username) {
            return res.status(400).json({
                message: "Both name and username are required"
            });
        }

        
        const updatedUser = await user.findByIdAndUpdate(
            id,
            {
                name,
                username
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            updatedUsername: updatedUser.username,
            updatedName: updatedUser.name,
            status: updatedUser.status
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!["ACTIVE", "BLOCKED"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const updatedUser = await user.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;

         if (!id) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }

        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
    
     
}

module.exports = {
    updateUser,
    deleteUser,
    updateUserStatus
}