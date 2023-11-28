
const express = require('express');
const router = express.Router();
const Job = require('../models/Company');
const User =require('../models/user')



// const getAllJobs = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) ; 
//     const pageSize = parseInt(req.query.pageSize) ; 


//     const skip = (page - 1) * pageSize;

//     const totalJobs = await Job.countDocuments();

    
//     const totalPages = Math.ceil(totalJobs / pageSize);

   
//     const jobs = await Job.find().skip(skip).limit(pageSize);
 
//     res.json({ jobs, totalPages });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while fetching job details' });
//   }
// };


// const getAllJobs = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
//     const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
//     const searchQuery = req.query.search; // Get the search query from the query parameters

//     // Calculate the skip value to skip items based on the page and pageSize
//     const skip = (page - 1) * pageSize;

//     // Define a regex pattern to use in the query
//     const regexPattern = new RegExp(searchQuery, 'i'); // Case-insensitive regex search

//     // Construct the query to search by jobtitle using regex
//     const query = {
//       jobtitle: { $regex: regexPattern },
//     };

//     // Find jobs that match the search query with pagination
//     const jobs = await Job.find(query)
//       .skip(skip)
//       .limit(pageSize);

//     // Calculate the total number of jobs for the given search query
//     const totalJobs = await Job.countDocuments(query);

//     // Calculate the total number of pages based on the total number of jobs and page size
//     const totalPages = Math.ceil(totalJobs / pageSize);

//     res.json({ jobs, totalPages });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while fetching job details' });
//   }
// };


const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
    const searchQuery = req.query.search; // Get the search query from the query parameters

    // Calculate the skip value to skip items based on the page and pageSize
    const skip = (page - 1) * pageSize;

    // Define a regex pattern to use in the query
    const regexPattern = new RegExp(searchQuery, 'i'); // Case-insensitive regex search

    // Construct the query to search by jobtitle using regex and include only active jobs
    const query = {
      jobtitle: { $regex: regexPattern },
      status: 'active',// F ilter for active jobs
    };

    // Find active jobs that match the search query with pagination
    const jobs = await Job.find(query)
      .skip(skip)
      .limit(pageSize);

    // Calculate the total number of active jobs for the given search query
    const totalJobs = await Job.countDocuments(query);

    // Calculate the total number of pages based on the total number of active jobs and page size
    const totalPages = Math.ceil(totalJobs / pageSize);

    res.json({ jobs, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching job details' });
  }
};









const multer = require('multer');
const path = require('path');


// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with a timestamp and its original extension
  },
});

const upload = multer({ storage });

// Update user profile, including resume file upload
// router.put('/profile/:email', upload.single('resume'), 
const profilePost=async (req, res) => {
  console.log("@@@@",req.body)
  const email = req.params.email;
  const updateData = req.body;
  if (req.file) {
    // If a resume file was uploaded, store its path in the updateData
    updateData.resume = req.file.path;
  }

  try {
    // Find the user by email and update their profile
    const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run validators to ensure the data meets schema requirements
    });
  console.log(updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(updatedUser);
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while updating the user profile' });
  }
};








// const profilePost= async (req, res) => {
//   const email = req.params.email;
//   const updateData = req.body;
//  console.log("####",req.body);
//   try {
//     // Find the user by email and update their profile
//     const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
//       new: true, // Return the updated document
//        runValidators: true, // Run validators to ensure the data meets schema requirements
     
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     return res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while updating the user profile' });
//   }
// };







const getUserByEmail = async (req, res) => {
    try {
      const email = req.params.email;
  
      // Use Mongoose to find a user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send the user details as a JSON response
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while fetching user details' });
    }
  };
  
 





// // Update user profile by email
// const updateProfile= async (req, res) => {
//   console.log("!!!!",req.params.email)
//   try {
    
//     const email = req.params.email;
//     const updateData = req.body; // Assuming you send the updated data in the request body
// console.log("#333",updateData);
//     // Find the user by email and update their profile
//     const updatedUser = await User.findOneAndUpdate({ email }, updateData, {
//       new: true, // Return the updated document
//       runValidators: true, // Run validators to ensure the data meets schema requirements
//     });
//     const savedEmail = updatedUser.email;
//       res.status(201).json({ email: savedEmail })

//     if (!updatedUser) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     return res.json(updatedUser);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while updating the user profile' });
//   }
// };







// Export the controller function
module.exports = { getAllJobs,profilePost,getAllJobs,getUserByEmail};
