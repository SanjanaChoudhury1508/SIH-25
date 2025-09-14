const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const Internship = require('../models/Internship');
const Application = require('../models/Application');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
const getStats = asyncHandler(async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalInternships = await Internship.countDocuments();
  const totalApplications = await Application.countDocuments();

  res.json({ totalStudents, totalInternships, totalApplications });
});

// @desc    Finalize allocation
// @route   PUT /api/admin/finalize/:id
const finalizeAllocation = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  application.status = 'Allocated';
  const updated = await application.save();
  res.json(updated);
});

module.exports = {
  getStats,
  finalizeAllocation,
};
