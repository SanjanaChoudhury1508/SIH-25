const express = require('express');
const {
  applyForInternship,
  getMyApplications,
  updateApplication,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/apply', protect(['student']), applyForInternship);
router.get('/mine', protect(['student']), getMyApplications);
router.put('/:id', protect(['admin', 'supervisor']), updateApplication);

module.exports = router;
