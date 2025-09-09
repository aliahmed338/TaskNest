import express from "express";

import {
  archiveTask,
  createTask,
  deleteTask,
  getAllTasks,
  getArchivedTasks,
  getTask,
  unarchiveTask,
  updateTask,
} from "../controller/taskController";
import { isAuthenticatedUser } from "../middleware/Authentication";
const router = express.Router();

router.route("/tasks").get(isAuthenticatedUser, getAllTasks);
router.route("/task").post(isAuthenticatedUser, createTask);
router
  .route("/task/:id")
  .get(isAuthenticatedUser, getTask)
  .put(isAuthenticatedUser, updateTask)
  .delete(isAuthenticatedUser, deleteTask);

router.route("/tasks/archived").get(isAuthenticatedUser, getArchivedTasks);
router.route("/task/:id/archive").patch(isAuthenticatedUser, archiveTask);
router.route("/task/:id/unarchive").patch(isAuthenticatedUser, unarchiveTask);

export default router;
