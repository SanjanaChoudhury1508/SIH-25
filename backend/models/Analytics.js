const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', default: null },
  internship_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', default: null },
  applications_count: Number,
  match_probability: Number,
  most_requested_skills: Object,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
