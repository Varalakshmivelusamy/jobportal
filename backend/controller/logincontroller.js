const User=require("../models/user");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");


const userLogin = async (req, res) => {
    try {
      const { email, password,role } = req.body;
      const existingUser = await User.findOne({ email });
     
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Wrong email or password ." });
  
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Wrong email or password." });
  
      // sign the token
      const userRole = existingUser.role;
      let token = jwt.sign(
        {
          user: existingUser._id,
        
          role: userRole,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1m'
        }
      );
      // send the token in a HTTP-only cookie
      console.log(process.env.JWT_SECRET);

      res
        .cookie("token", token, {
          maxAge: 900000,
          httpOnly: true,
          // secure: true,
        })
 
        res.json({ user: existingUser, role: userRole, token:token });
       
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  };


 
module.exports={userLogin}




// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const auth = require('../middleware/auth'); // Import the auth module

// const userLogin = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

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
//       const now = new Date();
//       console.log("Token creation time:", now.toISOString());

//       const expirationTime = new Date(now.getTime() + 1000); // 1 second expiration
//       console.log("Token expiration time:", expirationTime.toISOString());

//       return jwt.sign(
//         {
//           user: userId,
//           role: userRole,
//           iat: now.getTime() / 1000, // Include issuance time
//           // No need to set 'expiresIn' here since you've already included 'exp' in the payload
//           exp: expirationTime.getTime() / 1000, // Include expiration time
//         },
//         process.env.JWT_SECRET
//       );
      
//     };

//     // Sign the token with the user's role
//     const token = signToken(existingUser._id, userRole);

//     // Send the token in an HTTP-only cookie
//     res.cookie("token", token, {
//       maxAge: 5000, // Set the cookie expiration to 1 second (in milliseconds)
//       httpOnly: true,
//       // secure: true,
//     });

//     // Check the token's expiration
//     const decodedToken = auth.verifyToken(token);
//     if (decodedToken) {
//       console.log("Token is valid");
//     } else {
//       console.log("Token is expired or invalid");
//       // You can take appropriate action if the token is expired or invalid
//     }

//     // Return user information along with the token
//     res.json({ user: existingUser, role: userRole, token: token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send();
//   }
// };

// module.exports = { userLogin };
