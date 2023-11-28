// const Company=require("../models/Company");

// const Application = require('../models/application');
// // const { use } = require('../routes/Register');
// const postApplication = async (req, res) => {
//   try {
//     // Use the create method to create a new application document
//     const { _id, ...restOfData } = req.body;

// delete restOfData._id;
//     const application = await Application.create(restOfData);
//     console.log("application", application);

 
//     res.status(201).json(application);
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: 'Failed to create application' });
//   }
// };
const Company = require('../models/Company');
const Application = require('../models/application');

const postApplication = async (req, res) => {
  try {
    const { _id, ...restOfData } = req.body;

   
    const existingApplication = await Application.findOne({
      jobId: restOfData.jobId,
      userId: restOfData.userId,
    });

    if (existingApplication) {
      console.log("error")
      return res.status(409).json({ error: 'You have already applied for this job.' });
    }


    const application = await Application.create(restOfData);
    console.log('Application', application);

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create application' });
  }
};







const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    console.log(applicationId)
  
    const { status } = req.body; // Assuming you pass the status as JSON in the request body

    // Check if the status is valid (either "accept" or "reject")
    if (status !== 'accept' && status !== 'reject') {
      return res.status(400).json({ error: 'Invalid status. Status must be "accept" or "reject"' });
    }

    // Update the status of the application with the given applicationId
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Failed to update application status' });
  }
};






const getById = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId, "user");

    let query = { userId: userId }; // Start with a base query to filter by userId

    // Check if a status filter is provided in the query parameters
    console.log("req query",req.query.status)
    if (req.query.status) {
      const status = req.query.status;
      query.status = status;
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;

    const skip = (page - 1) * pageSize;

    const applications = await Application.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 }) // Sorting by creation date in descending order
      .exec();

    const totalApplications = await Application.countDocuments({status:query.status});

  

    const jobIds = applications.map((app) => app.jobId);
    // console.log("Job IDs: ", jobIds);

    const companies = await Company.find({ _id: { $in: jobIds }}).exec();


  


    const totalPages = Math.ceil(totalApplications / pageSize);


    const userDetails = applications.map((application) => {
   
      const jobIdString = application.jobId?.toString();

    

      const matchingCompany = companies.find((data) => data._id.toString() === jobIdString);



      return {
        status: application.status,
        _id: application._id, 
        username: application.username,
        applicationDate: application.createdAt,
        companyName: matchingCompany ? matchingCompany.companyName : 'N/A',
      };
    });
    


    res.json({
      applications: userDetails,
      totalPages: totalPages,
    });
   
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

// const getById = async (req, res) => {
//   try {
//     const userId = req.params.userId;
   

//     let query = { userId: userId }; // Start with a base query to filter by userId

  
//     if (req.query.status) {
//       const status = req.query.status;
//       query.status = status;
//     }

//     const applications = await Application.find(query)
//       .sort({ createdAt: -1 }) // Sorting by creation date in descending order
//       .exec();



//     const jobIds = applications.map((app) => app.jobId);
//     // console.log("Job IDs: ", jobIds);

//     const companies = await Company.find({ _id: { $in: jobIds }}).exec();

//     const userDetails = applications.map((application) => {
      
//       const jobIdString = application.jobId.toString();

//       const matchingCompany = companies.find((data) => data._id.toString() === jobIdString);

//       return {
//         status: application.status,
//         _id: application._id, 
//         username: application.username,
//         applicationDate: application.createdAt,
//         companyName: matchingCompany ? matchingCompany.companyName : 'N/A',
//       };
//     });
    
//     res.json({
//       applications: userDetails,
//     });
//   } catch (error) {
//     console.error('Error fetching application:', error);
//     res.status(500).json({ error: 'Failed to fetch application' });
//   }
// };





module.exports = { postApplication, getById,updateStatus };




















