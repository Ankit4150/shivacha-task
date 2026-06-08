require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const getUserByID = require('../controllers/getUserByID');
const protectMiddleware = require('../middleware/protectMiddleware');
const { assignTask, getAllTask, getTask } = require('../controllers/taskController');


const taskRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

// adminRoute.post( '/login', login )
// adminRoute.post( '/logout', logout)
taskRoute.post('/assign-task/:employeeId', protectMiddleware,  assignTask);
taskRoute.post('/' , protectMiddleware, getAllTask)
taskRoute.post('/:taskid', protectMiddleware, getTask)



module.exports = taskRoute;