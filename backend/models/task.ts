import mongoose, { Schema } from "mongoose";
import { ITask } from "../types/task";

const taskSchema = new Schema<ITask>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "General",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    links: {
      type: [String],
      required: false,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50],
      },
    ],
    attachments: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
        secure_url: { type: String },
        format: { type: String }, // jpg, png, pdf ...
        resource_type: { type: String }, // image, video, raw
        bytes: { type: Number }, // size in bytes
        created_at: { type: Date },
      },
    ],
  },

  { timestamps: true }
);

taskSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate();
  if (update.start && update.end && update.end <= update.start) {
    return next(new Error("End date must be after start date"));
  }
  next();
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
