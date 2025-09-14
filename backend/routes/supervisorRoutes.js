const express = require('express');
const {
  viewAssignedApplications,
  provideFeedback,
} = require('../controllers/supervisorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/applications', protect(['supervisor']), viewAssignedApplications);
router.put('/feedback/:id', protect(['supervisor']), provideFeedback);

module.exports = router;
