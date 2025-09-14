const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  internship_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship' },
  status: {
    type: String,
    enum: ['Applied', 'Shortlisted', 'Rejected', 'Completed'],
    default: 'Applied'
  },
  date_applied: { type: Date, default: Date.now },
  supervisor_feedback: String,
  admin_notes: String,
  final_decision: String,
  score: Number
});

module.exports = mongoose.model('Application', ApplicationSchema);
