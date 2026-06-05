require('dotenv').config();
const express = require('express')
const getUserByID = require('../controllers/getUserByID');
const protectMiddleware = require('../middleware/protectMiddleware');
const fetchAllUser = require('../controllers/fetchAllUsers');

const featureRoute = express.Router();

featureRoute.get('/me', getUserByID )
featureRoute.get('/alluser', fetchAllUser )



module.exports = featureRoute;