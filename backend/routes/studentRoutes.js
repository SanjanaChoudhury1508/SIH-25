const express = require('express');
const {
  registerStudent,
  loginStudent,
  getProfile,
  updateProfile,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerStudent);
router.post('/login', loginStudent);
router.get('/profile', protect(['student']), getProfile);
router.put('/profile', protect(['student']), updateProfile);

module.exports = router;
