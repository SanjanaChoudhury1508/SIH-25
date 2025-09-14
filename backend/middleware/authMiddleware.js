const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');
const Supervisor = require('../models/Supervisor');

const protect = (roles = []) => {
  return async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by role
        if (roles.includes('admin')) req.user = await Admin.findById(decoded.id).select('-password');
        else if (roles.includes('supervisor')) req.user = await Supervisor.findById(decoded.id).select('-password');
        else req.user = await Student.findById(decoded.id).select('-password');

        if (!req.user) return res.status(401).json({ message: 'Not authorized, user not found' });
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  };
};

module.exports = { protect };
