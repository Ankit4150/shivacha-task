


const { verifyToken } = require('../utils/jsonwebtoken');

const protectMiddleware = async (req, res, next) => {


  try {
    const token = req.cookies?.token || req.cookies?.Token;
    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = await verifyToken(token);

    
    req.user = decoded;

    
    req.user.id = decoded.id || decoded._id;

    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Token verification failed",
    });
  }
};

module.exports = protectMiddleware;