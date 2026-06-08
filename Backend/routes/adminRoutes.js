require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const { generateToken } = require('../utils/jsonwebtoken');
const {login, logout} = require('../controllers/authController');
const getUserByID = require('../controllers/getUserByID');
const { deleteUser ,updateUserStatus} = require('../controllers/updateAndDeleteUser');
const protectMiddleware = require('../middleware/protectMiddleware');


const adminRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

// adminRoute.post( '/login', login )
// adminRoute.post( '/logout', logout)
adminRoute.delete('/delete/:id', protectMiddleware, deleteUser);
adminRoute.put( "/statuschange/:id",protectMiddleware,updateUserStatus);

module.exports = adminRoute;