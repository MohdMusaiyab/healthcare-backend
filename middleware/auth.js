import jwt from "jsonwebtoken";
import { User } from "../models/associations.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid token.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    let message = "Invalid or expired token.";
    let statusCode = 403;

    if (error instanceof jwt.TokenExpiredError) {
      message = "Token expired. Please log in again.";
      statusCode = 401;
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Invalid token. Please log in again.";
    } else {
      message = "An unexpected error occurred.";
      statusCode = 500;
    }

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
