const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  role_title: String,
  description: String,
  skills_required: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  duration: String,
  location: String,
  stipend: String,
  internship_type: { type: String, enum: ['Full-time', 'Part-time', 'Virtual'] },
  date_posted: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now },
  eligibility_criteria: String,
  deadline: Date
});

module.exports = mongoose.model('Internship', InternshipSchema);
