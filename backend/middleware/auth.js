const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id, email, name (depending on payload)
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
