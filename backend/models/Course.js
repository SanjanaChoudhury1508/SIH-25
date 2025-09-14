const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: String,
  platform: String,
  type: { type: String, enum: ['Free', 'Paid'] },
  url: String
});

module.exports = mongoose.model('Course', CourseSchema);
