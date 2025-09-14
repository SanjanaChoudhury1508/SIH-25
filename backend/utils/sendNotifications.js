const Notification = require('../models/Notification');

const sendNotification = async (userId, message, type = 'App') => {
  await Notification.create({
    user_id: userId,
    message,
    type,
    status: 'Unread',
    created_at: new Date(),
  });
};

module.exports = sendNotification;
