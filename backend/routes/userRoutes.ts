import express from "express";
import {
  getUser,
  loginUser,
  logOutUser,
  registerUser,
} from "../controller/userController";
import { isAuthenticatedUser } from "../middleware/Authentication";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(logOutUser);
router.route("/me").get(isAuthenticatedUser, getUser);

export default router;
