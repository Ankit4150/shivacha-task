const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    date: {
        type: String,
        required: true
    },

    checkIn: {
        type: Date
    },

    checkOut: {
        type: Date
    },

    totalHours: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        default: "ABSENT"
    },
    

}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);