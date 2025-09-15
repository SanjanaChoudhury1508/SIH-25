// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Supervisor = require('../models/Supervisor');

const protect = (allowedRoles = []) => {
  return asyncHandler(async (req, res, next) => {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by role preference
        if (allowedRoles.includes('admin')) {
          req.user = await Admin.findById(decoded.id).select('-password');
        } else if (allowedRoles.includes('supervisor')) {
          req.user = await Supervisor.findById(decoded.id).select('-password');
        } else {
          req.user = await Student.findById(decoded.id).select('-password');
        }

        if (!req.user) {
          res.status(401);
          throw new Error('Not authorized, user not found');
        }

        next();
      } catch (err) {
        console.error(err);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('No token provided');
    }
  });
};

module.exports = { protect };
