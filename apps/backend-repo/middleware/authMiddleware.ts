import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; 

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return;
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_secret_key" 
    );

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
