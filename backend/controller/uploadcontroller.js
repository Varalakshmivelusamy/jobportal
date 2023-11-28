const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const Company = require("../models/Company");


const CsvData = mongoose.model('CsvData', new mongoose.Schema({

  jobtitle: String,
  payScale: Number,

}));

const uploadCSV = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No CSV file uploaded.' });
    }

    const results = [];
    let validationErrors = [];

    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (data) => {
   
        if (!/^[A-Za-z\s]+$/.test(data.jobtitle)) {
            console.log("validation error in jobtitle")
          validationErrors.push('Validation error in jobtitle');
        }

   
        if (isNaN(data.payScale)) {
            console.log("validationerror in pay scale")
          validationErrors.push('Validation error in payScale');
        }

     
  
      
          if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(data.email)) {
            validationErrors.push('Validation error in email. Invalid email format.');
          }

        results.push(data);
      })
      .on('end', async () => {
        if (validationErrors.length > 0) {
          return res.status(400).json({ errors: validationErrors });
        }

        try {
        
          await CsvData.insertMany(results);
          await Company.create(results);


          fs.unlinkSync(file.path);
          return res.json({ message: 'CSV data saved to the database successfully.' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Failed to save CSV data to the database.' });
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File upload failed.' });
  }
};

module.exports = { uploadCSV };
