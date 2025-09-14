const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, refPath: 'userType' },
  userType: { type: String, enum: ['Student', 'Supervisor', 'Admin'] },
  type: { type: String, enum: ['Email', 'SMS', 'App'] },
  message: String,
  status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
