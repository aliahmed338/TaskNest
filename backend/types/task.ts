import { Document, Types } from "mongoose";

export interface ITask extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  tags?: string[];
  attachments?: {
    public_id: string;
    url: string;
    secure_url?: string;
    format?: string;
    resource_type?: string;
    bytes?: number;
    created_at?: Date;
  }[];
  links?: string[];
  start: Date;
  end: Date;
  createdAt: Date;
  updatedAt: Date;
}
