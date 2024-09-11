const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Use your actual JWT secret here
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password from the attached user
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;