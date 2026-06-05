const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const { generateToken } = require('../utils/jsonwebtoken');
const user = require('../models/userModel')


const login = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        if (!username || !password || !role) {
            res.status(400).json({
                message: "**login Username, password and role are required"
            })
            return
        }
        let existinguser = null;

        if (role === "ADMIN" || role === "admin") {
            existinguser = await admin.findOne({
                username
            })
        } else if (role === "USER" || role === "user") {
            existinguser = await user.findOne({
                username
            })
        }
        if (!existinguser) {
            res.status(400).json({
                message: "**login username does'nt exist"
            })
            return
        }
        if (existinguser.status !== "ACTIVE" && existinguser.role === "USER") {
            res.status(400).json({
                message: "**login this user is blocked by admin"
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


        // res.cookie("token",token).status(200).json({
        //     message: "**login Loged In Successfully",
        //     username: existinguser.username,
        //     token: token,
        //     role: existinguser.role

        // })

        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
                message: "Logged In Successfully",
                username: existinguser.username,
                role: existinguser.role,
                token
            });

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "**login Somthing went wrong"

        })
    }
}

const register = async (req, res) => {
    try {
        const { name, username, password, role } = req.body;

        if (!name || !username || !password || !role) {
            res.status(400).json({
                message: "**register all field are required"
            })
            return
        }

        const existinguser = await user.findOne({
            username
        })

        if (existinguser) {
            res.status(400).json({
                message: "**register userame already existed"
            })
            return
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await user.create({
            name: name,
            username: username,
            password: hashedPassword,
            role: role
        })


        res.status(200).json({
            message: "**register Registerd  Successfully",
            name: newUser.name,
            username: newUser.username,
            role: newUser.role

        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "**register Somthing went wrong"

        })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (e) {
        console.log(e);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

module.exports = { login, register, logout };