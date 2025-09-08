import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(8, "Task title must be at least 8 characters")
    .max(30, "Task title must be less than 30 characters"),
  description: z
    .string()
    .min(30, "Task description must be at least 30 characters"),
  category: z.string().default("General"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending"),
  tags: z
    .array(
      z
        .string()
        .min(2, "Task tags must be at least 2 characters")
        .max(25, "Task tags must be  less than 25 characters")
    )
    .optional(),
  links: z.array(z.string().url()).optional(),
  attachments: z
    .array(
      z.object({
        public_id: z.string(),
        url: z.string().url(),
        secure_url: z.string().url().optional(),
        format: z.string().optional(),
        resource_type: z.string().optional(),
        bytes: z.number().optional(),
        created_at: z.date().optional(),
      })
    )
    .optional(),
  start: z.date(),
  end: z.date(),
});

export const taskUpdateSchema = z.object({
  title: z
    .string()
    .min(8, "Task title must be at least 8 characters")
    .max(30, "Task title must be less than 30 characters")
    .optional(),
  description: z
    .string()
    .min(30, "Task description must be at least 30 characters").optional(),
  category: z.string().default("General").optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium").optional(),
  status: z.enum(["pending", "in-progress", "completed"]).default("pending").optional(),
  tags: z
    .array(
      z
        .string()
        .min(2, "Task tags must be at least 2 characters")
        .max(25, "Task tags must be  less than 25 characters")
    )
    .optional(),
  links: z.array(z.string().url()).optional(),
  attachments: z
    .array(
      z.object({
        public_id: z.string(),
        url: z.string().url(),
        secure_url: z.string().url().optional(),
        format: z.string().optional(),
        resource_type: z.string().optional(),
        bytes: z.number().optional(),
        created_at: z.date().optional(),
      })
    )
    .optional(),
  start: z.date().optional(),
  end: z.date().optional(),
});

