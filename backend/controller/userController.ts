import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { z } from "zod";
import { loginSchema, regiserSchema } from "../validation/userValidation";
import ErrorHandler from "../utils/errorHandler";
import sendToken from "../utils/sendToken";

export const registerUser = catchAsyncError(
  async (
    req: Request<{}, {}, z.infer<typeof regiserSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, message: "User created successfully" });
  }
);

export const loginUser = catchAsyncError(
  async (
    req: Request<{}, {}, z.infer<typeof loginSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("please enter email & password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    const isPassword = await user.comparePassword(password);

    if (!isPassword) {
      return next(new ErrorHandler("Invalid email & password", 401));
    }

    sendToken(user, 200, res);
  }
);

export const logOutUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Logged Out",
    });
  }
);

export const getUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const users = await User.findById(req.user.id);

    res.status(200).json({
      users,
    });
  }
);
