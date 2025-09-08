import express from "express";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controller/taskController";
import { isAuthenticatedUser } from "../middleware/Authentication";
const router = express.Router();

router
  .route("/task")
  .get(isAuthenticatedUser, getAllTasks)
  .post(isAuthenticatedUser, createTask);
router
  .route("/task/:id")
  .get(isAuthenticatedUser, getTask)
  .put(isAuthenticatedUser, updateTask)
  .delete(isAuthenticatedUser, deleteTask);

export default router;
