

// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate the user using JWT
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    req.userId = decoded.userId; // Attach the userId to the request object
    next(); // Pass control to the next handler
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
