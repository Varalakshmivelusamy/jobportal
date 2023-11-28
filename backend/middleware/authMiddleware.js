// authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware function to check the user's role based on the JWT token
const checkUserRole = (requiredRole) => {
  return (req, res, next) => {
    // Get the token from the HTTP-only cookie or headers, depending on your setup
    const token = req.cookies.token || req.headers.authorization;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized: No token provided" });
    }

    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the required role matches the user's role from the token
      if (decoded.role === requiredRole) {
        // User has the required role, so allow them to access the route
        req.user = decoded.user; // Attach the user ID to the request if needed
        next();
      } else {
        // User does not have the required role, so deny access
        return res.status(403).json({ errorMessage: "Forbidden: Insufficient permissions" });
      }
    } catch (err) {
      // Token is invalid or expired
      return res.status(401).json({ errorMessage: "Unauthorized: Invalid token" });
    }
  };
};

module.exports = { checkUserRole };
