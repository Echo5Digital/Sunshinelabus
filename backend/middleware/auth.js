const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Normalise legacy 'superadmin' (old single-user system) to 'super_admin'
const normaliseRole = (role) => (role === 'superadmin' ? 'super_admin' : role);

const verifyRole = (roles) => (req, res, next) => {
  if (!req.admin) return res.status(401).json({ error: 'Not authenticated' });
  const role = normaliseRole(req.admin.role);
  if (!roles.includes(role)) {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }
  next();
};

module.exports = { verifyAdmin, verifyRole };
