import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { z } from "zod";
import { taskSchema, taskUpdateSchema } from "../validation/taskValidation";
import { Task } from "../models/task";
import ErrorHandler from "../utils/errorHandler";
import { IdParam } from "../types/task";
import { ApiFilter } from "../utils/ApiFilters";

/**
 * @desc   Get a single task by ID
 * @route  GET /api/v1/task/:id
 * @access Private (User must be authenticated)
 */
export const getTask = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req?.params as IdParam;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    res.status(200).json({ task });
  }
);

/**
 * @desc   Get all tasks
 * @route  GET /api/v1/tasks/:id
 * @access Private (User must be authenticated)
 */
export const getAllTasks = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const tasks = await Task.find({ archived: false });

    const apiFilter = new ApiFilter(tasks, req.query).filter().search();
    const filteredTask = apiFilter.tasks;
    const tasksNumber = filteredTask.length;

    res.status(200).json({ filteredTask, tasksNumber });
  }
);

/**
 * @desc   create task
 * @route  POST /api/v1/task/:id
 * @access Private (User must be authenticated)
 */
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

/**
 * @desc   update tsk
 * @route  PUT /api/v1/task/:id
 * @access Private (User must be authenticated)
 */
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

/**
 * @desc   delete task
 * @route  DELETE /api/v1/task/:id
 * @access Private (User must be authenticated)
 */
export const deleteTask = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req?.params as IdParam;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  }
);

/**
 * @desc   get achive tasks
 * @route  GET /api/v1/tasks/archived
 * @access Private (User must be authenticated)
 */
export const getArchivedTasks = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find({ archived: true });

    const apiFilter = new ApiFilter(tasks, req.query).filter().search();
    const filteredTask = apiFilter.tasks;
    const tasksNumber = filteredTask.length;

    res.status(200).json({ filteredTask, tasksNumber });
  }
);

/**
 * @desc   Archive a task by ID
 * @route  PATCH /api/v1/tasks/:id/archive
 * @access Private
 */
export const archiveTask = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req?.params as IdParam;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.archived = true;
    await task.save();

    res.status(200).json({ task, message: "Task archived successfully" });
  }
);

/**
 * @desc   Unarchive a task by ID
 * @route  PATCH /api/v1/tasks/:id/unarchive
 * @access Private
 */
export const unarchiveTask = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params as IdParam;

    const task = await Task.findById(id);

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.archived = false;
    await task.save();

    res.status(200).json({ task, message: "Task restored successfully" });
  }
);
