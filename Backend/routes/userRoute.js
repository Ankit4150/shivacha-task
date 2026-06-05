const {login, register, logout} = require('../controllers/authController')
const express = require('express');
const getUserByID = require('../controllers/getUserByID');
const { updateUser } = require('../controllers/updateAndDeleteUser');
const addEmployeeDetail = require('../controllers/employeeDetail');
const protectMiddleware = require('../middleware/protectMiddleware');

const userRoute = express.Router();

userRoute.post("/register/", register)
userRoute.post('/login', login)
userRoute.post( '/logout', logout)
userRoute.put('/update/:id',protectMiddleware, updateUser)
userRoute.post('/addemployee/:id',protectMiddleware, addEmployeeDetail)



module.exports = userRoute;