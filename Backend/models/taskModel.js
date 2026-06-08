const mongoose = require('mongoose')

const taskModel = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Model name of User
        required: true,
    },
    assignBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin", // Model name of Admin
        required: true,
    },
    taskName: {
        type: String,
        required: true,
    },
    taskDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ["Pending", "Completed",]
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("task", taskModel);