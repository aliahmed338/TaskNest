import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { taskSchema } from "../validation/taskValidation";
import { Task } from "../models/task";

export const createTask = catchAsyncError(
  async (
    req: Request<{}, {}, z.infer<typeof taskSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      title,
      description,
      category,
      status,
      priority,
      tags,
      attachments,
      links,
      start,
      end,
    } = req.body;
    const user = req.user;

    const task = await Task.create({
      user,
      title,
      description,
      category,
      status,
      priority,
      tags,
      attachments,
      links,
      start,
      end,
    });
    res.status(201).json({ task, message: "Task created successfully" });
  }
);

export const updateTask = catchAsyncError(
  async (
    req: Request<{}, {}, z.infer<typeof taskSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const {
      title,
      description,
      category,
      status,
      priority,
      tags,
      attachments,
      links,
      start,
      end,
    } = req.body;
    const user = req.user;

    const task = await Task.create({
      user,
      title,
      description,
      category,
      status,
      priority,
      tags,
      attachments,
      links,
      start,
      end,
    });
    res.status(201).json({ task, message: "Task created successfully" });
  }
);
