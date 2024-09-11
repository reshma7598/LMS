const adminAuth = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  };
  
  module.exports = adminAuth;