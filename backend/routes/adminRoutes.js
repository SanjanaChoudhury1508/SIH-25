const express = require('express');
const {
  getStats,
  finalizeAllocation,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect(['admin']), getStats);
router.put('/finalize/:id', protect(['admin']), finalizeAllocation);

module.exports = router;
