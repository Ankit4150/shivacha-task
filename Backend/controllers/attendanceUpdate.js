const user = require("../models/userModel");

const attendanceUpdate = async (req, res) => {
    try {
       const {id} = req.params; 
       console.log("********",id)
       const { status } = req.body;
       if(!id || !status){
        res.status(404).json({
            message:"Both id and status required"
        })
        return
       }
       const updatedUser = await user.findByIdAndUpdate(
             id,
            { status },
            { new: true }
       )

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
       res.status(200).json({
         message: "user attendance updated",
         username: updatedUser.username,
         status: updatedUser.status
       })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = attendanceUpdate;