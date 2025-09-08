import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncError from "./catchAsyncError";
import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";

export const isAuthenticatedUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Login first to access this resource", 401));
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET undefined");
    }

    const decoded = jwt.verify(token, secret) as { id: string };

    if (!decoded.id) {
      return next(new ErrorHandler("Invalid token", 401));
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = user;
    next();
  }
);
