// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Import your User model


// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { tokenId } = req.body;

//   try {
//     // Verify the Google ID token
//     const ticket = await googleClient.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email, sub } = ticket.getPayload();

//     // Check if the user with this email already exists
//     let user = await User.findOne({ email });

//     // If the user doesn't exist, create a new user in the database
//     if (!user) {
//       user = new User({
//         email,
//         // Add other user properties as needed
//       });

//       await user.save();
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Set the expiration time for the token (adjust as needed)
//     );

//     // Return the token and user information to the client
//     res.status(200).json({ token, userId: user._id, email: user.email });
//   } catch (error) {
//     console.error('Google login error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   googleLogin,
// };




// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user'); // Import your User model

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { tokenId } = req.body;
//   console.log('Received tokenId:', tokenId);
//   try {
//     // Verify the Google ID token
//     const ticket = await googleClient.verifyIdToken({
//       idToken: tokenId,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email, sub } = ticket.getPayload();

//     // Check if the user with this email already exists
//     let user = await User.findOne({ email });

//     // If the user doesn't exist, create a new user in the database
//     if (!user) {
//       user = new User({
//         email,
//         // Add other user properties as needed
//       });

//       await user.save();
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Set the expiration time for the token (adjust as needed)
//     );

//     // Return the token and user information to the client
//     res.status(200).json({ token, userId: user._id, email: user.email });
//   } catch (error) {
//     console.error('Google login error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   googleLogin,
// };

// controllers/googleLoginController.js

// controllers/googleLoginController.js

// const { OAuth2Client } = require('google-auth-library');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt'); // Import bcrypt
// const User = require('../models/user'); // Import your updated User model

// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// const googleLogin = async (req, res) => {
//   const { credential } = req.body;
//   console.log('Received credential:', credential);

//   try {
//     // Verify the Google ID token
//     const ticket = await googleClient.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     const { email } = ticket.getPayload();

//     let user = await User.findOne({ email });

//     if (!user) {
//       // Set a default password for the user
//       const defaultPassword = 'L123456';

//       // Hash the default password using bcrypt
//       const hashedPassword = await bcrypt.hash(defaultPassword, 10);

//       user = new User({
//         email,
//         password: hashedPassword,
//         // Add other user properties as needed
//       });

//       await user.save();
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' } // Set the expiration time for the token (adjust as needed)
//     );

//     // Return the token and user information to the client
//     res.status(200).json({ token, userId: user._id, email: user.email });
//   } catch (error) {
//     console.error('Google login error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   googleLogin,
// };




const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { credential } = req.body;
  console.log('Received credential:', credential);

  try {
    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // Set a default password for the user
      const defaultPassword = 'L123456';

      // Hash the default password using bcrypt
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      user = new User({
        email,
        password: hashedPassword,
        // Add other user properties as needed
      });

      await user.save();
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Set the expiration time for the token (adjust as needed)
    );

    // Set the token as a cookie in the response
    res.cookie('token', token, {
      httpOnly: true,
      // Other cookie options can be added here, such as 'secure' for HTTPS only
    });

    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  googleLogin,
};
