import catchAsyncError from "../middleware/catchAsyncError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { Note } from "../models/note";
import ErrorHandler from "../utils/errorHandler";
import { IdParam } from "../types/task";
import { noteSchema, noteUpdateSchema } from "../validation/nodeValidation";
import { BaseFilter } from "../utils/ApiSearch";

/**
 * @desc   Get a single note by ID
 * @route  GET /api/v1/notes/:id
 * @access Private
 */
export const getNote = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params as IdParam;

    const note = await Note.findById(id);

    if (!note) return next(new ErrorHandler("Note not found", 404));

    res.status(200).json({ note });
  }
);

/**
 * @desc   Get all notes
 * @route  GET /api/v1/notes
 * @access Private
 */
export const getAllNotes = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const notes = await Note.find({ archived: false });

    const apiFilter = new BaseFilter(notes, req.query).search();
    const filteredNotes = apiFilter.items; 
    const notesNumber = filteredNotes.length;

    res.status(200).json({ filteredNotes, notesNumber });
  }
);

/**
 * @desc   Create a note
 * @route  POST /api/v1/notes
 * @access Private
 */
export const createNote = catchAsyncError(
  async (
    req: Request<{}, {}, z.infer<typeof noteSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, content, date } = req.body;
    const user = req.user;

    const note = await Note.create({
      user,
      title,
      content,
      date,
    });

    res.status(201).json({ note, message: "Note created successfully" });
  }
);

/**
 * @desc   Update a note
 * @route  PUT /api/v1/notes/:id
 * @access Private
 */
export const updateNote = catchAsyncError(
  async (
    req: Request<{}, {}, z.infer<typeof noteUpdateSchema>>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params as IdParam;

    let note = await Note.findById(id);

    if (!note) return next(new ErrorHandler("Note not found", 404));

    note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ note, message: "Note updated successfully" });
  }
);

/**
 * @desc   Delete a note
 * @route  DELETE /api/v1/notes/:id
 * @access Private
 */
export const deleteNote = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params as IdParam;

    const note = await Note.findById(id);

    if (!note) return next(new ErrorHandler("Note not found", 404));

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted successfully" });
  }
);

/**
 * @desc   Get archived notes
 * @route  GET /api/v1/notes/archived
 * @access Private
 */
export const getArchivedNotes = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const notes = await Note.find({ archived: true });

    res.status(200).json({ notes });
  }
);

/**
 * @desc   Archive a note
 * @route  PATCH /api/v1/notes/:id/archive
 * @access Private
 */
export const archiveNote = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params as IdParam;

    const note = await Note.findById(id);

    if (!note) return next(new ErrorHandler("Note not found", 404));

    note.archived = true;
    await note.save();

    res.status(200).json({ note, message: "Note archived successfully" });
  }
);

/**
 * @desc   Unarchive a note
 * @route  PATCH /api/v1/notes/:id/unarchive
 * @access Private
 */
export const unarchiveNote = catchAsyncError(
  async (req: Request<{}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params as IdParam;

    const note = await Note.findById(id);

    if (!note) return next(new ErrorHandler("Note not found", 404));

    note.archived = false;
    await note.save();

    res.status(200).json({ note, message: "Note restored successfully" });
  }
);
