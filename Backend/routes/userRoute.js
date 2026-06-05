const {login, register} = require('../controllers/authController')
const express = require('express');
const getUserByID = require('../controllers/getUserByID');

const userRoute = express.Router();

userRoute.post("/register/", register)
userRoute.post('/login/', login)



module.exports = userRoute;