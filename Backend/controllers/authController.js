const { hashPassword, comparePassword } = require('../utils/passwordHashing');
const admin = require('../models/adminModel');
const { generateToken } = require('../utils/jsonwebtoken');
const user = require('../models/userModel')
const {generateOTP,sendOTP}=require("../utils/mailer")
 
const otpStore={};

const login = async (req, res) => {
    console.log("Login Data:", req.body);
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
         const otp = generateOTP();
        console.log(otp);
        otpStore[username] = {
            otp,
            expireAt: Date.now() + 5 * 60 * 1000
        };

        await sendOTP(username, otp);
        res.json({
            message: 'OTP sent to your email'
        });

     //   const token = await generateToken(existinguser)


      

        // return res
        //     .cookie("token", token, {
        //         httpOnly: true,
        //         secure: false,
        //         sameSite: "lax",
        //         maxAge: 7 * 24 * 60 * 60 * 1000
        //     })
        //     .status(200)
        //     .json({
        //         message: "Logged In Successfully",
        //         username: existinguser.username,
        //         role: existinguser.role,
        //         token
        //     });

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

        // const newUser = await user.create({
        //     name: name,
        //     username: username,
        //     password: hashedPassword,
        //     role: role
        // })
        if (role === "admin" || role === "ADMIN") {
    const newAdmin = await admin.create({
        name,
        username,
        password: hashedPassword,
        role: "ADMIN"
    });

    return res.status(200).json({
        message: "Admin Registered Successfully",
        username: newAdmin.username,
        role: newAdmin.role
    });
}
const newUser = await user.create({
    name,
    username,
    password: hashedPassword,
    role: "USER"
});

return res.status(200).json({
    message: "User Registered Successfully",
    username: newUser.username,
    role: newUser.role
});


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
            secure: false,
            sameSite: "lax"
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

const verifyOTP = async (req, res) => {
    try {
        const { username, otp } = req.body;

        const record = otpStore[username];

        if (!record) {
            return res.status(400).json({
                message: "OTP not requested"
            });
        }

        if (Date.now() > record.expiresAt) {
            delete otpStore[username];

            return res.status(400).json({
                message: "OTP expired"
            });
        }

        if (String(record.otp) !== String(otp)) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        delete otpStore[username];

        const existinguser =
            await admin.findOne({ username }) ||
            await user.findOne({ username });

        if (!existinguser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const token = await generateToken(existinguser);

         return res
            .cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
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
        console.log(e);

        return res.status(500).json({
            message: e.message
        });
    }
};



module.exports = { login, register, logout ,verifyOTP};