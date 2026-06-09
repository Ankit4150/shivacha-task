require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const getUserByID = require('../controllers/getUserByID');
const protectMiddleware = require('../middleware/protectMiddleware');
const { assignTask, getAllTask, getTask, updateTask } = require('../controllers/taskController');


const taskRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

// adminRoute.post( '/login', login )
// adminRoute.post( '/logout', logout)
taskRoute.post('/assign-task/:employeeId', protectMiddleware,  assignTask);
taskRoute.get('/' , protectMiddleware, getAllTask)
taskRoute.get('/:taskid', protectMiddleware, getTask)
taskRoute.put('/update/:taskid', protectMiddleware, updateTask)



module.exports = taskRoute;