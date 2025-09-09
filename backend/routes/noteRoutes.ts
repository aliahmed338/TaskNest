import express from "express";

import { isAuthenticatedUser } from "../middleware/Authentication";
import {
  archiveNote,
  createNote,
  deleteNote,
  getAllNotes,
  getArchivedNotes,
  getNote,
  unarchiveNote,
  updateNote,
} from "../controller/noteController";
const router = express.Router();

router.route("/notes").get(isAuthenticatedUser, getAllNotes);
router.route("/note").post(isAuthenticatedUser, createNote);
router
  .route("/note/:id")
  .get(isAuthenticatedUser, getNote)
  .put(isAuthenticatedUser, updateNote)
  .delete(isAuthenticatedUser, deleteNote);

router.route("/notes/archived").get(isAuthenticatedUser, getArchivedNotes);
router.route("/note/:id/archive").patch(isAuthenticatedUser, archiveNote);
router.route("/note/:id/unarchive").patch(isAuthenticatedUser, unarchiveNote);

export default router;
