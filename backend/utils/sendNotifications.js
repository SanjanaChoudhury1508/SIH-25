// backend/utils/sendNotifications.js
const Notification = require('../models/Notification');

const sendNotification = async ({ userId, userType = 'Student', type = 'App', message }) => {
  try {
    await Notification.create({
      user_id: userId,
      userType,
      type,
      message,
      status: 'Unread',
    });
  } catch (err) {
    console.error('Failed to save notification:', err.message);
  }
};

module.exports = sendNotification;
