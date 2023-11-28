const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  skills: {
    type: Object,
   default:[]

  },
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;