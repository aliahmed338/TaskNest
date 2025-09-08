import mongoose, { Document, Types } from "mongoose";

export interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  content: string;
  category?: string;
  date: string;
  createdAt: Date;
}
