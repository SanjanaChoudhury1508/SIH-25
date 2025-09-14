const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');

// @desc    View all assigned applications
// @route   GET /api/supervisors/applications
const viewAssignedApplications = asyncHandler(async (req, res) => {
  const apps = await Application.find({ assigned_supervisor: req.user.id })
    .populate('student_id')
    .populate('internship_id');
  res.json(apps);
});

// @desc    Provide feedback
// @route   PUT /api/supervisors/feedback/:id
const provideFeedback = asyncHandler(async (req, res) => {
  const { feedback, status } = req.body;
  const application = await Application.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  application.supervisor_feedback = feedback;
  if (status) application.status = status;

  const updated = await application.save();
  res.json(updated);
});

module.exports = {
  viewAssignedApplications,
  provideFeedback,
};
