const asyncHandler = require('express-async-handler');
const Internship = require('../models/Internship');

// @desc    Create internship
// @route   POST /api/internships
const createInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.create(req.body);
  res.status(201).json(internship);
});

// @desc    Get all internships
// @route   GET /api/internships
const getAllInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.find({});
  res.json(internships);
});

// @desc    Update internship
// @route   PUT /api/internships/:id
const updateInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }

  Object.assign(internship, req.body);
  const updated = await internship.save();
  res.json(updated);
});

// @desc    Delete internship
// @route   DELETE /api/internships/:id
const deleteInternship = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);

  if (!internship) {
    res.status(404);
    throw new Error('Internship not found');
  }

  await internship.remove();
  res.json({ message: 'Internship removed' });
});

module.exports = {
  createInternship,
  getAllInternships,
  updateInternship,
  deleteInternship,
};
