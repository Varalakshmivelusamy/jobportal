// const jwt = require('jsonwebtoken');

// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization;
//     if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
//     const token = authHeader.split(' ')[1];
//     console.log(token)
//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.sendStatus(403); //invalid token
//             req.user = decoded.UserInfo.username;
//             req.roles = decoded.UserInfo.roles;
//             next();
//         }
//     );
// }

// module.exports = verifyJWT



const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
      
    }
    console.log("res", res.json)
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      req.user = verified.user;
      next();
    } 
    catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ errorMessage: "Session expired" });
       
      } 
      else {
        console.error(err);
        res.status(500).send();
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
  {console.log(res.status)}
};

module.exports = authentication;
