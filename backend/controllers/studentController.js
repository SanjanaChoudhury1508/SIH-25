const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate token
const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Register
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include name, email and password');
  }
  const exists = await Student.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error('Student already exists');
  }
  const hashed = await bcrypt.hash(password, 10);
  const student = await Student.create({ name, email, password: hashed });
  res.status(201).json({ _id: student._id, name: student.name, email: student.email, token: genToken(student._id) });
});

// Login
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  if (student && (await bcrypt.compare(password, student.password))) {
    res.json({ _id: student._id, name: student.name, email: student.email, token: genToken(student._id) });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// Get profile
const getProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id).select('-password');
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  res.json(student);
});

// Update profile
const updateProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user._id);
  if (!student) { res.status(404); throw new Error('Student not found'); }

  student.name = req.body.name || student.name;
  student.college = req.body.college || student.college;
  student.course = req.body.course || student.course;
  student.year = req.body.year || student.year;
  student.skills = req.body.skills || student.skills;
  student.resume_file_path = req.body.resume_file_path || student.resume_file_path;

  if (req.body.password) {
    student.password = await bcrypt.hash(req.body.password, 10);
  }

  const updated = await student.save();
  res.json(updated);
});

module.exports = { registerStudent, loginStudent, getProfile, updateProfile };
