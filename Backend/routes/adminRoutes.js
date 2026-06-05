require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const { generateToken } = require('../utils/jsonwebtoken');
const {login} = require('../controllers/authController');
const getUserByID = require('../controllers/getUserByID');

const adminRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

adminRoute.post( '/login', login )

module.exports = adminRoute;