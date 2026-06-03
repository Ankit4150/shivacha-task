const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "tkhmtyhmtyjhytht"

const generateToken = async (user) => {

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, JWT_SECRET, {
        expiresIn: "2h"
    })
    return token;

}

const verifyToken = async (token, JWT_SECRET) => {
 return jwt.verify(token, JWT_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}