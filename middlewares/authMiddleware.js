import jwt from "jsonwebtoken";
import JWT_SECRET from "../utility/config";

const secretKey = JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.header("x-auth-token");

  // Check if no token is provided
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Attach user information to the request object
    req.user = decoded.user;

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
