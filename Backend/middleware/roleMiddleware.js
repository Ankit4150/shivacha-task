const user = require('../models/userModel')


const roleMiddleware=async(userId)=>{
   const user=await user.findById(userId);

    if(user.role !== "ADMIN"){
        return false
    }else{
        return true  

    }

}

module.exports=roleMiddleware;