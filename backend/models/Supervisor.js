const mongoose = require('mongoose');

const SupervisorSchema = new mongoose.Schema({
  name: String,
  department: String,
  institution: String,
  email: { type: String, unique: true },
  phone_number: String,
  password: { type: String, required: true },
  assigned_internships: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Internship' }]
});

module.exports = mongoose.model('Supervisor', SupervisorSchema);
