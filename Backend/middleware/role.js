// Role-based access control middleware
// Usage: role('poster'), role('collector'), or role('poster', 'collector')
module.exports = function (...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
