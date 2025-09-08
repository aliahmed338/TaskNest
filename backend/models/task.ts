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
      validate: {
        validator: function (this: ITask, value: Date) {
          return value > this.start;
        },
        message: "End date must be after start date",
      },
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

export const Task = mongoose.model<ITask>("Task", taskSchema);
