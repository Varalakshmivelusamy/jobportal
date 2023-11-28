const express = require('express');
const router = express.Router();
const registercontroller = require('../controller/registercontroller');
const logincontroller=require('../controller/logincontroller');
const multer = require('multer'); // Import multer for file uploads
const path = require('path');
const fs = require('fs');


const uploadController =require ('../controller/uploadcontroller')
const usercontroller=require('../controller/usercontroller');
const jobcontroller=require('../controller/jobcontroller');
const applicationcontroller=require('../controller/applicationcontroller');
const skillscontroller =require('../controller/skillscontroller');
const applicantcontroller=require('../controller/applicantcontroller');
const Degreecontroller =require('../controller/Degreecontroller');
const applicantcount =require('../controller/applicantcount');
const authentication=require('../middleware/verifyJWT')
const googlelogin =require('../controller/googlelogincontroller');
const { verificationCode, changePassword } = require('../controller/mailcontroller');

/**
 
/register:
  post:
    summary: Register a new user
    description: Create a new user account.
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email:
                type: string
                description: User's email
              password:
                type: string
                description: User's password
              role:
                type: string
                description: User role (user or admin)
                enum: [user, admin]  # Specify the allowed values here
            example:
              email: user@example.com
              password: password123
              role: user
    responses:
      200:
        description: User registered successfully.
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  description: Success message
      400:
        description: Bad request. User registration failed.
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                  description: Error message


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and get an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *             example:
 *               email: user@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 token:
 *                   type: string
 *                   description: Access token
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /profile/{email}:
 *   put:
 *     summary: Update user profile with resume
 *     description: Update a user's profile and upload a resume file.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: User's email for identifying the profile to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file to upload.
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request. User profile update failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get a list of all jobs
 *     description: Retrieve a list of all available job listings.
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                  
 *                    
 *      
 *                   title:
 *                     type: string
 *                     description: Job title.
 *                   description:
 *                     type: string
 *                     description: Job description.
 *                 example:
 *                 
 *                   title: Software Engineer
 *                   description: We are looking for a software engineer.
 *       404:
 *         description: No jobs found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */


/**
 * @swagger
 * /admin/{email}:
 *   post:
 *     summary: Create a new job posting
 *     description: Create a new job posting in the system.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Admin's email for identifying the user creating the job posting.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 description: Name of the company.
 *                 example: Example Company
 *                 required: true
 *               jobtitle:
 *                 type: string
 *                 description: Job title.
 *                 example: Software Engineer
 *                 required: true
 *               jobdescription:
 *                 type: string
 *                 description: Job description.
 *                 example: We are looking for a software engineer.
 *                 required: true
 *               jobtype:
 *                 type: string
 *                 description: Type of job.
 *                 example: Full-time
 *                 required: true
 *               email:
 *                 type: string
 *                 description: Admin's email.
 *                 example: admin@example.com
 *                 required: true
 *             required:
 *               - companyName
 *               - jobtitle
 *               - jobdescription
 *               - jobtype
 *               - email
 *     responses:
 *       201:
 *         description: Job posting created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Bad request. Job posting creation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /admin/{email}:
 *   get:
 *     summary: Get job postings by admin
 *     description: Retrieve job postings created by a specific admin user.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Admin's email for identifying the user whose job postings to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job postings retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/JobPosting'
 *       404:
 *         description: No job postings found for the provided admin email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
/**





/**
 * @swagger
 * /getApplicant/{email}:
 *   get:
 *     summary: Get applicant details by email
 *     description: Retrieve details of an applicant based on their email.
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Email of the applicant for identifying the user whose details to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applicant details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicantDetails'
 *       404:
 *         description: No applicant found for the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */












const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, 'uploads/'); // e.g., 'uploads/' or your specified directory
    },
    filename: function (req, file, cb) {
     
      // Ensure that this generates unique file names to avoid conflicts.
      cb(null, Date.now() + '-' + file.originalname); // e.g., Date.now() + '-' + file.originalname or your custom logic
    },
  });
  
  const upload = multer({ storage });
  
  router.post('/api/google-login', googlelogin.googleLogin);
  router.post('/api/send-verification-code',verificationCode);
  router.post('/api/change-password',changePassword)
router.post('/register',registercontroller.newRegister);
router.post('/login/',logincontroller.userLogin);
router.put('/profile/:email',authentication, upload.single('resume'),usercontroller.profilePost);
router.get('/profile/:email',usercontroller.getUserByEmail);
router.get('/jobs', usercontroller.getAllJobs);
router.post(`/admin/:email`,jobcontroller.postJob);
router.put('/admin/:jobId',  authentication,jobcontroller.updateJob);
router.get(`/admin/:email/`,jobcontroller.getPostedJobs);
router.delete('/admin/:jobId',jobcontroller.deleteJob);
router.post('/applications/:userId/:jobId', authentication,applicationcontroller.postApplication);
router.get('/count/:email',applicantcount.applicantcount)
router.get('/getapplication/:userId', applicationcontroller.getById);
router.post('/skills',skillscontroller.postSkills);
router.get('/skills',skillscontroller.getSkills);
router.post('/Degree',Degreecontroller.postDegree);
router.get('/Degree',Degreecontroller.getDegrees);
router.get('/getApplicant/:email/',applicantcontroller.applicantDetails)
router.put('/updateStatus/:applicationId', authentication,applicationcontroller.updateStatus);
router.get('/resume/uploads/:filename', (req, res) => {

    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../uploads', filename);
    console.log('File path:', filePath);
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  });
  router.post('/uploadCSV', upload.single('csvFile'),uploadController.uploadCSV);


module.exports=router;








