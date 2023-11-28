// // Import necessary modules and User model
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const nodemailer = require('nodemailer');

// // Initialize nodemailer transporter (update with your email configuration)
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'varalakshmivelusamy@gmail.com',
//     pass: 'Lakshmi@2001',
//   },
// });

// // Endpoint for sending a verification code to the user's email
// router.post('/send-verification-code', async (req, res) => {
//   const { email } = req.body;

//   // Generate a random verification code (you can use a library for this)
//   const verificationCode = Math.floor(100000 + Math.random() * 900000);

//   try {
//     // Save the verification code in the user's document in the database
//     const user = await User.findOneAndUpdate(
//       { email },
//       { $set: { verificationCode } },
//       { new: true }
//     );

//     // Send the verification code to the user's email
//     const mailOptions = {
//       from: 'varalakshmivelusamy@gmail.com',
//       to: email,
//       subject: 'Password Change Verification Code',
//       text: `Your verification code is: ${verificationCode}`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: 'Verification code sent successfully.' });
//   } catch (error) {
//     console.error('Error sending verification code:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Endpoint for changing the password based on the verification code
// router.post('/change-password', async (req, res) => {
//   const { email, verificationCode, newPassword } = req.body;

//   try {
//     // Check if the verification code matches the one stored in the database
//     const user = await User.findOne({ email, verificationCode });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid verification code.' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update the user's password in the database
//     await User.updateOne({ email }, { $set: { password: hashedPassword } });

//     res.status(200).json({ message: 'Password changed successfully.' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;






// Import necessary modules and User model
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');

// Initialize nodemailer transporter (update with your email configuration)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'varalakshmivelusamy@gmail.com',
    pass: 'qqyx teqs zkaz riod',
  },
});

// Endpoint for sending a verification code to the user's email
 const verificationCode = async (req, res) => {
  const { email } = req.body;

  // Generate a random verification code (you can use a library for this)
  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  try {
    // Save the verification code in the user's document in the database
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { verificationCode } },
      { new: true }
    );

 
    const mailOptions = {
      from: 'varalakshmivelusamy@gmail.com',
      to: email,
      subject: 'Password Change Verification Code',
      text: `Your verification code is: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code sent successfully.' });
  } catch (error) {
    console.error('Error sending verification code:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// const changePassword= async (req, res) => {
//   const { email, verificationCode, newPassword } = req.body;
//   console.log('Request Body:', req.body);
//   try {
//     // Check if the verification code matches the one stored in the database
//     const user = await User.find({ email ,verificationCode});
//     console.log('User found:', user);
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid verification code.' });
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 5);

//     console.log('Hashed Password:', hashedPassword);
//     await User.updateOne({ email }, { $set: { password: hashedPassword } });

//     res.status(200).json({ message: 'Password changed successfully.' });
//   } catch (error) {
//     console.error('MongoDB Error:', error);
//     console.error('Error changing password:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };



const changePassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
    console.log('Request Body:', req.body);
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      console.log('User found:', user);
  
      if (!user) {
        return res.status(400).json({ error: 'User not found.' });
      }
  
      // Check if the verification code matches
      if (user.verificationCode !== verificationCode) {
        return res.status(400).json({ error: 'Invalid verification code.' });
      }
  

      const hashedPassword = await bcrypt.hash(newPassword, 5);
  
      console.log('Hashed Password:', hashedPassword);
      await User.updateOne({ email }, { $set: { password: hashedPassword } });
  
      res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      console.error('MongoDB Error:', error);
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports ={verificationCode,changePassword};
