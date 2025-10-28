const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    console.log("[auth] Middleware triggered");

    // Get the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.log("[auth] No token provided");
      return res.status(401).json({ msg: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("[auth] Token verified:", decoded);

    // Attach the decoded token (which includes id) to req.user
    req.user = decoded; // { id, email, userType }

    next();
  } catch (err) {
    console.error("[auth] Error verifying token:", err.message);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
};

module.exports = auth;
