require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credientials');
const swaggerUi =require('swagger-ui-express');
const swaggerJsDoc =require('swagger-jsdoc')
// const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbconnect');
const fs = require('fs');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();
const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Jop Portal App",
             version:"1.0.0",
             description:"Job Portal App"
        },
        servers:[{
            url:"http://localhost:3500",
        }]
    },
    apis: ['./routes/*.js'],
};
const spacs =swaggerJsDoc(options);
app.use("/api-docs",swaggerUi.serve, swaggerUi.setup(spacs));

// custom middleware logger
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
// app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/Register'));

// Define a route to serve resume files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/register', require('./routes/register'));
// app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

// app.use(verifyJWT);
// app.use('/employees', require('./routes/api/employees'));
// app.use('/users', require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } 
});




// app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});






// require('dotenv').config();
// const express = require('express');
// const app = express();
// const path = require('path');
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const credentials = require('./middleware/credientials');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
// const connectDB = require('./config/dbconnect');
// const fs = require('fs');
// const multer = require('multer'); // Import multer for file uploads
// const PORT = process.env.PORT || 3500;

// // Connect to MongoDB
// connectDB();

// // custom middleware logger
// // app.use(logger);

// // Handle options credentials check - before CORS!
// // and fetch cookies credentials requirement
// app.use(credentials);

// // Cross-Origin Resource Sharing
// app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: false }));

// // Built-in middleware to handle JSON data
// app.use(express.json());

// // Middleware for cookies
// app.use(cookieParser());

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Define the destination directory for file uploads
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Route for file upload
// app.post('/upload', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No files were uploaded.');
//   }

//   // Process the uploaded file here (e.g., save it to a database)
//   const uploadedFile = req.file;

//   // Respond with a success message
//   res.status(200).send('File uploaded successfully.');
// });

// // Your other routes and middleware can be defined here

// app.all('*', (req, res) => {
//   res.status(404);
//   if (req.accepts('html')) {
//     res.sendFile(path.join(__dirname, 'views', '404.html'));
//   }
// });

// mongoose.connection.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
