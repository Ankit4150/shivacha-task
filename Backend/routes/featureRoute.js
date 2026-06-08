require('dotenv').config();
const express = require('express')
const getUserByID = require('../controllers/getUserByID');
const protectMiddleware = require('../middleware/protectMiddleware');
const fetchAllUser = require('../controllers/fetchAllUsers');
const attendanceUpdate = require('../controllers/attendanceUpdate');

const featureRoute = express.Router();

featureRoute.get('/me', protectMiddleware,getUserByID )
featureRoute.get('/alluser',protectMiddleware, fetchAllUser )



module.exports = featureRoute;  