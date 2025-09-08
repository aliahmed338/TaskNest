import express from "express";

import { createTask } from "../controller/taskController";
import { isAuthenticatedUser } from "../middleware/Authentication";
const router = express.Router();

router.route("/task").post(isAuthenticatedUser, createTask);

export default router;
