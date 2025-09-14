const express = require('express');
const {
  applyForInternship,
  getMyApplications,
  getAIMatches,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', protect(['student']), applyForInternship);
router.get('/mine', protect(['student']), getMyApplications);
router.get('/match/:studentId', protect(['student', 'admin']), getAIMatches);

module.exports = router;
