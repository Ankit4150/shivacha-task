require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const getUserByID = require('../controllers/getUserByID');
const protectMiddleware = require('../middleware/protectMiddleware');
const { assignTask } = require('../controllers/taskController');


const taskRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

// adminRoute.post( '/login', login )
// adminRoute.post( '/logout', logout)
taskRoute.post('/:employeeId', protectMiddleware,  assignTask);


module.exports = taskRoute;