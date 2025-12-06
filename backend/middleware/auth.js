const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, email, name

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
