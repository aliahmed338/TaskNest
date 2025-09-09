import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(8, "note title must be at least 8 characters")
    .max(30, "note title must be less than 30 characters"),
  content: z
    .string()
    .min(10, "note description must be at least 30 characters"),
  date: z.date(),
});

export const noteUpdateSchema = z.object({
  title: z
    .string()
    .min(8, "note title must be at least 8 characters")
    .max(30, "note title must be less than 30 characters")
    .optional(),
  content: z
    .string()
    .min(10, "note description must be at least 30 characters")
    .optional(),
  date: z.date().optional(),
});
