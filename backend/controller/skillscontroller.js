
const Skill = require('../models/skills'); // Assuming you have a Skill model

// Create a new skill
const postSkills=async (req, res) => {
  try {
    const { skills} = req.body;


    

    // Create a new skill
    const newSkill = new Skill({ skills});
    await newSkill.save();

    res.status(201).json(newSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create skill' });
  }
};



const getSkills = async (req, res) => {
    try {
      // Fetch all skills from the database
      const skills = await Skill.find({}, "skills"); // Fetch only the "skills" field
  
      // Extract the "skills" field from each document
      const skillValues = skills.map((skill) => skill.skills).flat();
   
      res.status(200).json(skillValues);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ error: "Unable to fetch skills" });
    }
  };
  


  module.exports={postSkills,getSkills};