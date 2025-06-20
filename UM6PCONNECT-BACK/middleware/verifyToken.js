const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; // <<<<<<<<<<<<<< use userId here, not id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
