import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";

export default (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = {
    message: err?.message || "Intervel serve Error",
    status: err?.statusCode || 500,
  };

  res.status(error.status).json({
    message: error.message,
    error: err,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
