const mongoose = require('mongoose');

const DegreeSchema = new mongoose.Schema({
  degree: {
    type: Object,
   default:[]

  },
});

const Degree = mongoose.model('Degree', DegreeSchema);

module.exports =Degree ;

// const mongoose = require('mongoose');

// const DegreeSchema = new mongoose.Schema({
//   degree: {
//     type: String, // Changed to String from Object
//     default: ''
//   },
// });

// const Degree = mongoose.model('Degree', DegreeSchema);

// module.exports = Degree;


