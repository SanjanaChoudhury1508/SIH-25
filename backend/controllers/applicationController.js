// backend/controllers/applicationController.js
const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Student = require('../models/Student');
const Internship = require('../models/Internship');

// Simple rule-based score function (no AI):
const calculateMatchScore = (student, internship) => {
  try {
    const studentSkills = (student.skills || []).map(s => s.toLowerCase());
    const reqSkills = (internship.skills_required || []).map(s => s.toLowerCase());
    if (!reqSkills.length) return 0;
    const matched = reqSkills.filter(s => studentSkills.includes(s)).length;
    return Math.round((matched / reqSkills.length) * 100);
  } catch (err) {
    return 0;
  }
};

// Apply
const applyForInternship = asyncHandler(async (req, res) => {
  const { internshipId } = req.body;
  const student = await Student.findById(req.user._id);
  const internship = await Internship.findById(internshipId);
  if (!student || !internship) { res.status(404); throw new Error('Student or Internship not found'); }

  const score = calculateMatchScore(student, internship);

  const already = await Application.findOne({ student_id: student._id, internship_id: internship._id });
  if (already) { res.status(400); throw new Error('Already applied'); }

  const application = await Application.create({
    student_id: student._id,
    internship_id: internship._id,
    status: 'Applied',
    score,
  });

  res.status(201).json(application);
});

// Get my applications
const getMyApplications = asyncHandler(async (req, res) => {
  const apps = await Application.find({ student_id: req.user._id }).populate('internship_id');
  res.json(apps);
});

// Admin / supervisor can update status & feedback
const updateApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if (!application) { res.status(404); throw new Error('Application not found'); }

  application.status = req.body.status || application.status;
  application.supervisor_feedback = req.body.supervisor_feedback || application.supervisor_feedback;
  application.admin_notes = req.body.admin_notes || application.admin_notes;
  application.final_decision = req.body.final_decision || application.final_decision;

  const updated = await application.save();
  res.json(updated);
});

module.exports = { applyForInternship, getMyApplications, updateApplication };
