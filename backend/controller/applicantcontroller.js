
// const express = require('express');
// const Application = require('../models/application');
// const User = require('../models/user');
// const Company = require('../models/Company');
// const ITEMS_PER_PAGE = 3; 

// const applicantDetails = async (req, res) => {
//   try {
//     const email = req.params.email;
//     const page = parseInt(req.query.page) || 1;
//     const { status } = req.query; 

//     const adminJobs = await Company.find({ email: email });

//     if (!adminJobs || adminJobs.length === 0) {
//       return res.status(404).json({ error: 'Admin jobs not found' });
//     }

//     const jobIds = adminJobs.map((adminJob) => adminJob._id);

//     // Define a filter object based on the status
//     const statusFilter = status ? { status } : {};

//     const totalApplications = await Application.countDocuments({
//       jobId: { $in: jobIds },
//       ...statusFilter, // Apply the status filter conditionally
//     });
    
//     const applications = await Application.find({
//       jobId: { $in: jobIds },
//       ...statusFilter, // Apply the status filter conditionally
//     })
//       .skip((page - 1) * ITEMS_PER_PAGE)
//       .limit(ITEMS_PER_PAGE);

   
//     const applicationDetails = [];

//     for (const application of applications) {
//       const user = await User.findById(application.userId);
//       const job = await Company.findById(application.jobId);

//       if (user && job) {
//         const combinedDetails = {
//           jobtitle:job.jobtitle,
//           companyName:job.companyName,
//           _id: application._id,
//           status: application.status,
//           username: user.username,
//           email: user.email,
//           age: user.age,
//           phoneNumber: user.phoneNumber,
//           degree: user.degree,
//           skills: user.skills,
//           country: user.country,
//           state: user.state,
//           city: user.city,
//           resume: user.resume,
//         };
//         applicationDetails.push(combinedDetails);
//       }
//     }
  
//     const totalPages = Math.ceil(totalApplications / ITEMS_PER_PAGE);

//     res.json({
//       data: applicationDetails,
//       totalData: totalApplications,
//       currentPage: page,
//       totalPages: totalPages,
//     });

//   } catch (error) {
//     console.error('Error fetching applications:', error);
//     res.status(500).json({ error: 'Failed to fetch applications' });
//   }
// };





// module.exports = { applicantDetails };










const express = require('express');
const Application = require('../models/application');
const User = require('../models/user');
const Company = require('../models/Company');
const ITEMS_PER_PAGE = 5; 

const applicantDetails = async (req, res) => {
  try {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1;
    const { status, jobtitle, companyName } = req.query;

    const adminJobs = await Company.find({
      email: email,
      jobtitle: { $regex: new RegExp(jobtitle, 'i') }, // Filter by jobtitle
      companyName: { $regex: new RegExp(companyName, 'i') }, // Filter by companyName
    });

    if (!adminJobs || adminJobs.length === 0) {
      return res.status(404).json({ error: 'Admin jobs not found' });
    }

    const jobIds = adminJobs.map((adminJob) => adminJob._id);

    // Define a filter object based on the status
    const statusFilter = status ? { status } : {};

    const totalApplications = await Application.countDocuments({
      jobId: { $in: jobIds },
      ...statusFilter, // Apply the status filter conditionally
    });
    
    const applications = await Application.find({
      jobId: { $in: jobIds },
      ...statusFilter, // Apply the status filter conditionally
    })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    const applicationDetails = [];

    for (const application of applications) {
      const user = await User.findById(application.userId);
      const job = await Company.findById(application.jobId);

      if (user && job) {
        const combinedDetails = {
          jobtitle: job.jobtitle,
          companyName: job.companyName,
          _id: application._id,
          status: application.status,
          username: user.username,
          email: user.email,
          age: user.age,
          phoneNumber: user.phoneNumber,
          degree: user.degree,
          skills: user.skills,
          country: user.country,
          state: user.state,
          city: user.city,
          resume: user.resume,
        };
        applicationDetails.push(combinedDetails);
      }
    }
  
    const totalPages = Math.ceil(totalApplications / ITEMS_PER_PAGE);

    res.json({
      data: applicationDetails,
      totalData: totalApplications,
      currentPage: page,
      totalPages: totalPages,
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

module.exports = { applicantDetails };

