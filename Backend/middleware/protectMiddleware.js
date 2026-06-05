const { verifyToken } = require('../utils/jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek"

const protectMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            console.log("No token found")
            return res.status(401).json({
                message: "No token found, authorization failed"
            });
        }

        const decoded = verifyToken(token);

        req.userId = decoded.id;
        req.user = decoded;

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Token verification failed"
        });
    }
};

module.exports = protectMiddleware;