const asyncHandler = require('express-async-handler');
const Application = require('../models/Application');
const Student = require('../models/Student');
const Internship = require('../models/Internship');
const { calculateMatchScore } = require('../ai/matchingEngine');

// @desc    Apply for internship
// @route   POST /api/applications/apply
const applyForInternship = asyncHandler(async (req, res) => {
  const { internshipId } = req.body;
  const student = await Student.findById(req.user.id);
  const internship = await Internship.findById(internshipId);

  if (!student || !internship) {
    res.status(404);
    throw new Error('Student or Internship not found');
  }

  const score = calculateMatchScore(student, internship);

  const application = await Application.create({
    student_id: student._id,
    internship_id: internship._id,
    status: 'Applied',
    date_applied: new Date(),
    score,
  });

  res.status(201).json(application);
});

// @desc    View student's applications
// @route   GET /api/applications/mine
const getMyApplications = asyncHandler(async (req, res) => {
  const apps = await Application.find({ student_id: req.user.id })
    .populate('internship_id');
  res.json(apps);
});

// @desc    AI Matching Suggestions
// @route   GET /api/applications/match/:studentId
const getAIMatches = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId;
  const student = await Student.findById(studentId).populate('skills');

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  const internships = await Internship.find({});

  const matches = internships.map(internship => {
    const score = calculateMatchScore(student, internship);
    return { internship, match_score: score };
  });

  matches.sort((a, b) => b.match_score - a.match_score);
  res.json(matches);
});

module.exports = {
  applyForInternship,
  getMyApplications,
  getAIMatches,
};
