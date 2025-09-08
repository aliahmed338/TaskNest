import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { taskSchema, taskUpdateSchema } from "../validation/taskValidation";
import { Task } from "../models/task";
import ErrorHandler from "../utils/errorHandler";
import { IdParam } from "../types/task";
import { ApiFilter } from "../utils/ApiFilters";

export const getTask = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req?.params as IdParam;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({ task });
  }
);

export const getAllTasks = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const tasks = await Task.find();

    const apiFilter = new ApiFilter(tasks, req.query).filter().search();
    const filteredTask = apiFilter.tasks;
    const tasksNumber = filteredTask.length;
    
    res.status(200).json({ filteredTask, tasksNumber });
  }
);

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
    req: Request<{}, {}, z.infer<typeof taskUpdateSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req?.params as IdParam;

    let task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ task, message: "Task updated successfully" });
  }
);

export const deleteTask = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req?.params as IdParam;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  }
);
