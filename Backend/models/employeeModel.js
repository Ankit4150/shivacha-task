const mongoose = require('mongoose')

const EmployeeModel = new mongoose.Schema({
    
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Model name of User
      required: true,
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
    }
})

module.exports = mongoose.model('employee', EmployeeModel)