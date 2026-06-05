const { verifyToken } = require('../utils/jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek"

const protectMiddleware = async (req, res, next) => {
    
    // const authHeader = req.headers.authorization;
    const token =req.cookies?.token;

    // if (authHeader || authHeader.startsWith("Bearer ")) {
    //     token = authHeader.split(" ")[1];
    // if(token || token.startsWith("Bearer ")){

    // if (!token) {
    //     res.status(401).json({
    //         message: "You are not authorize to access this info"
    //     })
    //     return
    // }

    // try {
    //     if (!token) {
    //         return
    //     }
    //     const decode = verifyToken(token, JWT_SECRET)
    //     req.userId = decode.id;
    //     console.log('the decode user is : ', req.user)
    //     next();
    // } catch (e) {
    //     console.log(e)
    //     res.status(400).json({
    //         message: "Token verification failed"
    //     })
    //     return
    // }
    // }else{
    //     res.status(401).json({
    //         message: "No token found, Authorization failed"
    //     })
    //     return
    // }
    
}
module.exports = protectMiddleware;
