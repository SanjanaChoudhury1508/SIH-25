const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: String,
  course: String,
  year: Number,
  skills: [{ type:String }],
  resume_file_path: String,
  email: { type: String, required: true, unique: true },
  phone_number: String,
  profile_status: { type: String, default: 'Incomplete' },
  password: { type: String, required: true },
  registration_date: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
