const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new student
// @route   POST /api/students/register
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const studentExists = await Student.findOne({ email });
  if (studentExists) {
    res.status(400);
    throw new Error('Student already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    email,
    password: hashedPassword
  });

  if (student) {
    res.status(201).json({
      _id: student.id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid student data');
  }
});

// @desc    Login student
// @route   POST /api/students/login
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });

  if (student && (await bcrypt.compare(password, student.password))) {
    res.json({
      _id: student.id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get student profile
// @route   GET /api/students/profile
const getProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user.id).select('-password');
  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// @desc    Update student profile
// @route   PUT /api/students/profile
const updateProfile = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.user.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  student.name = req.body.name || student.name;
  student.college = req.body.college || student.college;
  student.course = req.body.course || student.course;
  student.year = req.body.year || student.year;

  if (req.body.password) {
    student.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedStudent = await student.save();
  res.json(updatedStudent);
});

module.exports = {
  registerStudent,
  loginStudent,
  getProfile,
  updateProfile,
};
