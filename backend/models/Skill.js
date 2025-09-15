const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  category: String,
  description: String
});

module.exports = mongoose.model('Skill', SkillSchema);
