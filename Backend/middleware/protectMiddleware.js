// // const { verifyToken } = require('../utils/jsonwebtoken')

// // const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek"

// // const protectMiddleware = async (req, res, next) => {
// //     try {
// //         const token = req.cookies?.token;
// //        console.log("token prote",token)
// //         if (!token) {
// //             console.log("No token found")
// //             return res.status(401).json({
// //                 message: "No token found, authorization failed"
// //             });
// //         }

// //         const decoded = verifyToken(token);

// //         req.userId = decoded.id;
// //         req.user = decoded;

// //         next();

// //     } catch (error) {
// //         console.log(error);

// //         return res.status(401).json({
// //             message: "Token verification failed"
// //         });
// //     }
// // };

// // module.exports = protectMiddleware;


// const { verifyToken } = require('../utils/jsonwebtoken')

//  const JWT_SECRET = process.env.JWT_SECRET || "jtngjrnrjnfjrnfrjnjrenek"

// const protectMiddleware = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

    

//     if (!token) {
//       return res.status(401).json({
//         message: "No token found",
//       });
//     }

//     const decoded = await verifyToken(token);

//     req.user = decoded;

//     next();
//   } catch (error) {
//     console.log(error);

//     return res.status(401).json({
//       message: "Token verification failed",
//     });
//   }
// };

// module.exports = protectMiddleware;



const { verifyToken } = require('../utils/jsonwebtoken');

const protectMiddleware = async (req, res, next) => {
 console.log("URL:", req.originalUrl);
console.log("Cookies:", req.cookies);
console.log("token:", req.cookies?.token);

  try {
    const token = req.cookies?.token || req.cookies?.Token;
    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = await verifyToken(token);

    // ✅ original decoded object (as you wanted)
    req.user = decoded;

    // ✅ ensure compatibility for your controllers
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