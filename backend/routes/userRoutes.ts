import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controller/userController";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

export default router;
