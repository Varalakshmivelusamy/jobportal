


// const postJob = async (req, res) => {
//   try {
  
//     const email = req.params.email;
//     const {
//       jobid,
//       jobtitle,
//       jobtype,
//       jobdescription,
//       payScale,
//       companyName,
//       Location,
      
//       phonenumber,
//     } = req.body;

//     const newJob = new company({
//       jobid,
//       jobtitle,
//       jobtype,
//       jobdescription,
//       payScale,
//       companyName,
//       Location,
//       email,
//       phonenumber,
     
//     });
//     const job = await company.findOne({email});
     
//     // Save the new job
//     const savedJob = await newJob.save();

//     res.status(201).json(savedJob);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while posting the job' });
//   }
// };


// const updateJob = async (req, res) => {
//     try {
//       const email = req.params.email; 
//       // Assuming you pass the job ID as a URL parameter
//       const jobId=req.params.jobId;
    
//       const {
       
//         jobtitle,
//         jobtype,
//         jobdescription,
//         payScale,
//         companyName,
//         Location,
       
//         phonenumber,
//       } = req.body;
  
//       // Find the job by ID
//       const job = await company.findById({_id:jobId});
  
//       if (!job) {
//         return res.status(404).json({ error: 'Job not found' });
//       }

     
  
//       // Update the job details
    
//       job.jobtitle = jobtitle;
//       job.jobdescription=jobdescription
//       job.jobtype = jobtype;
//      job.phonenumber=phonenumber;
//       job.payScale=payScale;
//      job.companyName=companyName;
//       job.Location=Location
  
//       // Save the updated job
//       const updatedJob = await job.save();
  
//       res.json(updatedJob);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred while updating the job' });
//     }
//   };
  

  

// const getPostedJobs= async (req, res) => {
//   try {
//     const email = req.params.email;

//     // Find jobs associated with the provided email address
//     const jobs = await company.find({ email });

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({ error: 'No jobs found for the provided email' });
//     }

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching job details' });
//   }
// };




// // const getPostedJobs = async (req, res) => {
// //   try {
// //     const email = req.params.email;

// //     // Define pagination parameters
// //     const page = parseInt(req.query.page) || 1; // Current page, default to 1
// //     const limit = parseInt(req.query.limit) || 3; // Number of items per page, default to 10

// //     // Calculate the skip value based on the current page and limit
// //     const skip = (page - 1) * limit;

// //     // Find jobs associated with the provided email address with pagination
// //     const jobs = await company
// //       .find({ email })
// //       .skip(skip)
// //       .limit(limit)
// //       .exec();

// //     if (!jobs || jobs.length === 0) {
// //       return res.status(404).json({ error: 'No jobs found for the provided email' });
// //     }

// //     // Get the total count of jobs for pagination metadata
// //     const totalCount = await company.countDocuments({ email });

// //     // Calculate the total number of pages
// //     const totalPages = Math.ceil(totalCount / limit);

// //     res.status(200).json({
// //       jobs,
// //       totalPages,
// //       currentPage: page,
// //       totalJobs: totalCount,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ error: 'An error occurred while fetching job details' });
// //   }
// // };





// // DELETE a job by jobid
// const deleteJob= async (req, res) => {
//   try {
//     //  const email=req.pa
//     const jobId=req.params.jobId;
//     console.log(jobId)
//     // Find and delete the job by jobid
//     const deletedJob = await company.findByIdAndRemove({ _id:jobId });

//     if (!deletedJob) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     res.status(200).json({ message: 'Job deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while deleting the job' });
//   }
// };

// module.exports = { postJob, updateJob,getPostedJobs,deleteJob};


const company=require("../models/Company");

const postJob = async (req, res) => {
  try {
  
    const email = req.params.email;
    const {
      jobid,
      jobtitle,
      jobtype,
      jobdescription,
      payScale,
      companyName,
      Location,
      state,
      city,
      country,
      
      phonenumber,
    } = req.body;
    console.log(req.body);
    const newJob = new company({
      jobid,
      jobtitle,
      jobtype,
      jobdescription,
      payScale,
      companyName,
      Location,
      email,
      phonenumber,
      state,
      city,
      country,
     
    });
    console.log(newJob)
    const job = await company.findOne({email});
     
    // Save the new job
    const savedJob = await newJob.save();

    res.status(201).json(savedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while posting the job' });
  }
};


const updateJob = async (req, res) => {
    try {
      const email = req.params.email; 
      // Assuming you pass the job ID as a URL parameter
      const jobId=req.params.jobId;
    
      const {
       
        jobtitle,
        jobtype,
        jobdescription,
        payScale,
        companyName,
        Location,
       
        phonenumber,
      } = req.body;
  
      // Find the job by ID
      const job = await company.findById({_id:jobId});
  
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

     
  
      // Update the job details
    
      job.jobtitle = jobtitle;
      job.jobdescription=jobdescription
      job.jobtype = jobtype;
     job.phonenumber=phonenumber;
      job.payScale=payScale;
     job.companyName=companyName;
      job.Location=Location
  
      // Save the updated job
      const updatedJob = await job.save();
  
      res.json(updatedJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the job' });
    }
  };
  
  // const getPostedJobs = async (req, res) => {
  //   try {
  //     const email = req.params.email;
  //     const page = parseInt(req.query.page); // Default to page 1 if no page parameter is provided
  //     const pageSize = parseInt(req.query.pageSize); // Default page size to 10 if not provided
      
  //     // Calculate the skip value to skip items based on the page and pageSize
  //     const skip = (page - 1) * pageSize;
  
  //     // Find jobs associated with the provided email address with pagination
  //     const jobs = await company
  //       .find({ email })
  //       .skip(skip)
  //       .limit(pageSize);
  
  //     if (!jobs || jobs.length === 0) {
  //       return res.status(404).json({ error: 'No jobs found for the provided email' });
  //     }
  
  //     // Calculate the total number of jobs for the given email
  //     const totalJobs = await company.countDocuments();
     
  //     // Calculate the total number of pages based on the total number of jobs and page size
  //     const totalPages = Math.ceil(totalJobs / pageSize);
  //   console.log("totalPages",totalPages)
  //     // Send the job listings and total pages as part of the response
  //     res.status(200).json({ jobs, totalPages });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'An error occurred while fetching job details' });
  //   }
  // };
  
  

// const getPostedJobs= async (req, res) => {
//   try {
//     const email = req.params.email;

//     // Find jobs associated with the provided email address
//     const jobs = await company.find({ email });

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({ error: 'No jobs found for the provided email' });
//     }

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching job details' });
//   }
// };


// const getPostedJobs = async (req, res) => {
//   try {
//     const email = req.params.email;
//     const page = parseInt(req.query.page)   // Default to page 1 if no page parameter is provided
//     const pageSize = parseInt(req.query.pageSize) ; // Default page size to 10 if not provided
//   console.log("page",page);
//   console.log("pagesize",pageSize);
//     // Calculate the skip value to skip items based on the page and pageSize
//     const skip = (page - 1) * pageSize;

//     // Find jobs associated with the provided email address with pagination
//     const jobs = await company
//       .find({ email })
//       .skip(skip)
//       .limit(pageSize);

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({ error: 'No jobs found for the provided email' });
//     }

//     res.status(200).json(jobs);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching job details' });
//   }
// };



// const getPostedJobs = async (req, res) => {
//   try {
//     const email = req.params.email;
//     const page = parseInt(req.query.page); // Default to page 1 if no page parameter is provided
//     const pageSize = parseInt(req.query.pageSize); // Default page size to 10 if not provided
    
//     // Calculate the skip value to skip items based on the page and pageSize
//     const skip = (page - 1) * pageSize;

//     // Find jobs associated with the provided email address with pagination
//     const jobs = await company
//       .find({ email })
//       .skip(skip)
//       .limit(pageSize);

//     if (!jobs || jobs.length === 0) {
//       return res.status(404).json({ error: 'No jobs found for the provided email' });
//     }

//     // Calculate the total number of jobs for the given email
//     const totalJobs = await company.countDocuments();
   
//     // Calculate the total number of pages based on the total number of jobs and page size
//     const totalPages = Math.ceil(totalJobs / pageSize);
//   console.log("totalPages",totalPages)
//     // Send the job listings and total pages as part of the response
//     res.status(200).json({ jobs, totalPages });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching job details' });
//   }
// };
const getPostedJobs = async (req, res) => {
  try {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if no page parameter is provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10 if not provided
    const searchQuery = req.query.search; // Get the search query from the query parameters

    // Calculate the skip value to skip items based on the page and pageSize
    const skip = (page - 1) * pageSize;

    // Define a regex pattern to use in the query
    const regexPattern = new RegExp(searchQuery, 'i'); // Case-insensitive regex search

    // Construct the query to search multiple fields using regex
    const query = {
      email,
      $or: [
        { jobtitle: { $regex: regexPattern } },
       
      ],
    };

   
    const jobs = await company
      .find(query)
      .skip(skip)
      .limit(pageSize);

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ error: 'No jobs found for the provided search query' });
    }

  
    const totalJobs = await company.countDocuments(query);

    // Calculate the total number of pages based on the total number of jobs and page size
    const totalPages = Math.ceil(totalJobs / pageSize);

    // Send the job listings, total pages, and total jobs count as part of the response
    res.status(200).json({ jobs, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching job details' });
  }
};



// // DELETE a job by jobid
// const deleteJob= async (req, res) => {
//   try {
//     //  const email=req.pa
//     const jobId=req.params.jobId;
//     console.log(jobId)
//     // Find and delete the job by jobid
//     const deletedJob = await company.findByIdAndRemove({ _id:jobId });

//     if (!deletedJob) {
//       return res.status(404).json({ error: 'Job not found' });
//     }

//     res.status(200).json({ message: 'Job deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while deleting the job' });
//   }
// };


const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Find and update the job status by jobid
    const updatedJob = await company.findByIdAndUpdate(jobId, { status: 'inactive' });

    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json({ message: 'Job marked as inactive successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while marking the job as inactive' });
  }
};







module.exports = { postJob, updateJob,getPostedJobs,deleteJob};


