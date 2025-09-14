const mongoose = require('mongoose');

const ResumeParsingSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  extracted_skills: [String],
  experience_years: Number,
  education: String,
  parsing_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResumeParsing', ResumeParsingSchema);
