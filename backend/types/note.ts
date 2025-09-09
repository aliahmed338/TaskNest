import { Document, Types } from "mongoose";

export interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  content: string;
  archived: boolean;
  date: string;
  createdAt: Date;
}
