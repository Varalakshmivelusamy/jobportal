const allowedOrigins = require('./allowedOrigin');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;



// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3501;

// const allowedOrigins = ['http://localhost:3000']; // Add your frontend URL here

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));

// // ...other middleware and routes...

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
