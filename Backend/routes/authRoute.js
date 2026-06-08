require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const { generateToken } = require('../utils/jsonwebtoken');
const {login, logout, verifyOTP} = require('../controllers/authController');
const getUserByID = require('../controllers/getUserByID');
const { deleteUser } = require('../controllers/updateAndDeleteUser');
const protectMiddleware = require('../middleware/protectMiddleware');

const authRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

authRoute.post( '/login', login )
authRoute.post('/verify-otp', verifyOTP);
authRoute.post( '/logout', logout)


module.exports = authRoute;