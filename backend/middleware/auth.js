

// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const userLogin = async (req, res) => {
//   try {
//     const { email, password,role } = req.body;
//    console.log(role);

//     const existingUser = await User.findOne({ email });

//     if (!existingUser)
//       return res.status(401).json({ errorMessage: "Wrong email or password." });

//     const passwordCorrect = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!passwordCorrect)
//       return res.status(401).json({ errorMessage: "Wrong email or password." });

//     // Determine the user's role from the database
//     const userRole = existingUser.role;

//     // Create a function to sign the JWT token
//     const signToken = (userId, ) => {
    
//       return jwt.sign(
//         {
//           user: userId,
//           role: userRole,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1s" } 
        
//       );
//     };
       
//     // Sign the token with user's role
//     const token = signToken(existingUser._id, userRole);

//     // Send the token in an HTTP-only cookie
//     res.cookie("token", token, {
      
//       maxAge: 1000,
//       httpOnly: true,
//       // secure: true,
//     });

//     // Return user information along with the token
//     res.json({ user: existingUser, role: userRole, token:token });
  
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// };

// module.exports = { userLogin };




// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // Function to verify the token
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     return decoded;
//   } catch (err) {
//     if (err instanceof jwt.TokenExpiredError) {
//       console.log("Token has expired");
//       return null;
//     } else {
//       console.error("Error verifying token:", err);
//       return null;
//     }
//   }
// };

// const userLogin = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     console.log(role);

//     const existingUser = await User.findOne({ email });

//     if (!existingUser)
//       return res.status(401).json({ errorMessage: "Wrong email or password." });

//     const passwordCorrect = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!passwordCorrect)
//       return res.status(401).json({ errorMessage: "Wrong email or password." });

//     const userRole = existingUser.role;

//     // Create a function to sign the JWT token
//     const signToken = (userId, userRole) => {
//       return jwt.sign(
//         {
//           user: userId,
//           role: userRole,
//         },
//         process.env.JWT_SECRET,
//         { expiresIn: "1s" }
//       );
//     };

//     // Sign the token with user's role
//     const token = signToken(existingUser._id, userRole);

//     // Send the token in an HTTP-only cookie
//     res.cookie("token", token, {
//       maxAge: 1000,
//       httpOnly: true,
//       // secure: true,
//     });

//     // Check the token's expiration
//     const decodedToken = verifyToken(token);
//     if (decodedToken) {
//       console.log("Token is valid");
//     } else {
//       console.log("Token is expired or invalid");
//     }

//     // Return user information along with the token
//     res.json({ user: existingUser, role: userRole, token: token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// };

// module.exports = { userLogin };




const jwt = require("jsonwebtoken");

// Function to verify the token
const verifyToken = (token) => {

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(token);
    console.log(process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Token has expired");
      return null;
    } else {
      console.error("Error verifying token:", err);
      return null;
    }
  }
};

module.exports = {
  verifyToken,
};



// const jwt = require("jsonwebtoken");

// // Function to verify the token and check expiration
// const verifyToken = (token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Check if the token has expired
//     if (decoded.exp <= Math.floor(Date.now() / 1000)) {
//       console.log("!!!!Token has expired");
//       return null;
//     }
    
//     return decoded;
//   } catch (err) {
//     if (err instanceof jwt.TokenExpiredError) {
//       console.log("Token has expired");
//       return null;
//     } else {
//       console.error("Error verifying token:", err);
//       return null;
//     }
//   }
// };

// module.exports = {
//   verifyToken,
// };
