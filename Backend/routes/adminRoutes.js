require('dotenv').config();
const express = require('express')
const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const { generateToken } = require('../utils/jsonwebtoken');

const adminRoute = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek";

adminRoute.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: "both username and password is required"
            })
            return
        }

        const existinguser = await admin.findOne({
            username
        })

        if (!existinguser) {
            res.status(400).json({
                message: "Admin does'nt exist"
            })
            return
        }

        const comparedPassword = await comparePassword(password, existinguser.password)

        if (!comparedPassword) {
            res.status(400).json({
                message: "Invalid Password"
            })
            return
        }

        const token = await generateToken(existinguser)

        res.status(200).json({
            message: "Loged In Successfully",
            username: existinguser.username,
            token: token,
            role: existinguser.role

        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "Somthing went wrong"

        })
    }


})


module.exports = adminRoute;