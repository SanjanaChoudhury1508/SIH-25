const express = require('express');
const {
  createInternship,
  getAllInternships,
  updateInternship,
  deleteInternship,
} = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect(['admin']), createInternship);
router.get('/', getAllInternships);
router.put('/:id', protect(['admin']), updateInternship);
router.delete('/:id', protect(['admin']), deleteInternship);

module.exports = router;
