
// const Degree = require('../models/degree'); // Assuming you have a Skill model

// // Create a new skill
// const postDegree=async (req, res) => {
//   try {
//     const { Degree} = req.body;


    

//     // Create a new skill
//     const newDegree = new Degree({ Degree});
//     await newDegree.save();

//     res.status(201).json(newDegree);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to create Degree' });
//   }
// };



// const getDegree = async (req, res) => {
//     try {
//       // Fetch all skills from the database
//       const Degree = await Degree.find({}, "Degree"); // Fetch only the "skills" field
  
//       // Extract the "skills" field from each document
//       const DegreeValues = Degree.map((Degree) => Degree.Degrees);
  
//       res.status(200).json(DegreeValues);
//     } catch (error) {
//       console.error("Error fetching Degrees:", error);
//       res.status(500).json({ error: "Unable to fetch Degrees" });
//     }
//   };
  




const Degree = require('../models/degree'); // Assuming you have a Degree model

// Create a new degree
const postDegree = async (req, res) => {
  try {
    const { degree } = req.body;

    // Create a new degree
    const newDegree = new Degree({ degree });
    await newDegree.save();

    res.status(201).json(newDegree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create degree' });
  }
};
const getDegrees = async (req, res) => {
    try {
      // Fetch all degrees from the database
      const degrees = await Degree.find({}, "degree"); // Fetch only the "degree" field
  
      // Extract the "degree" field from each document
      const degreeValues = degrees.map((degree) => degree.degree);
  
      res.status(200).json(degreeValues);
    } catch (error) {
      console.error("Error fetching degrees:", error);
      res.status(500).json({ error: "Unable to fetch degrees" });
    }
  };
  

  module.exports={postDegree, getDegrees};