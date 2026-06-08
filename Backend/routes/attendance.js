const express = require("express");
const routerattendance = express.Router();

const protectMiddleware = require("../middleware/protectMiddleware");

const {
    checkIn,
    checkOut, getMonthlyAttendance,  getTodayAttendance
} = require("../controllers/attendance");

routerattendance.post("/checkin", protectMiddleware, checkIn);

routerattendance.post("/checkout", protectMiddleware, checkOut);
routerattendance.get(  "/monthly",protectMiddleware,getMonthlyAttendance);
routerattendance.get( "/today",protectMiddleware,getTodayAttendance);

module.exports = routerattendance;