const Attendance = require("../models/attendance");

const checkIn = async (req, res) => {
    try {

        const employeeId = req.user.id;

        const today = new Date().toISOString().split("T")[0];

        const existingAttendance = await Attendance.findOne({
            employeeId,
            date: today
        });

        if (existingAttendance) {
            return res.status(400).json({
                message: "Already Checked In"
            });
        }

        const attendance = await Attendance.create({
            employeeId,
            date: today,
            checkIn: new Date()
        });

        return res.status(200).json({
            message: "Checked In Successfully",
            attendance
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const checkOut = async (req, res) => {
    try {

        const employeeId = req.user.id;

        const today = new Date().toISOString().split("T")[0];

        const attendance = await Attendance.findOne({
            employeeId,
            date: today
        });

        if (!attendance) {
            return res.status(400).json({
                message: "Please Check In First"
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                message: "Already Checked Out"
            });
        }

        const checkInTime = new Date(attendance.checkIn);
        const checkOutTime = new Date();

        const totalHours =
            (checkOutTime - checkInTime) / (1000 * 60 * 60);

        let status = "ABSENT";

        if (totalHours >= 8) {
            status = "FULL_DAY";
        } else if (totalHours >= 4) {
            status = "HALF_DAY";
        }

        attendance.checkOut = checkOutTime;
        attendance.totalHours = totalHours.toFixed(2);
        attendance.status = status;

        await attendance.save();

        return res.status(200).json({
            message: "Checked Out Successfully",
            attendance
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
const getMonthlyAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const attendance = await Attendance.find({
      employeeId
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      attendance
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const getTodayAttendance = async (req, res) => {
  try {
    const employeeId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({
      employeeId,
      date: today,
    });

    return res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { checkIn, checkOut,getMonthlyAttendance ,getTodayAttendance};