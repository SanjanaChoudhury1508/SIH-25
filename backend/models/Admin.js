const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['Admin', 'Scheme Manager'] },
  last_login: Date
});

module.exports = mongoose.model('Admin', AdminSchema);
