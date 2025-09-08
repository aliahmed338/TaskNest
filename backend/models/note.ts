import mongoose, { Schema } from "mongoose";
import { INote } from "../types/note";

const noteSchema = new Schema<INote>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Note must have a title"],
    },
    content: {
      type: String,
      required: [true, "Note must have content"],
    },
    category: {
      type: String,
      default: "General",
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model<INote>("Note", noteSchema);
