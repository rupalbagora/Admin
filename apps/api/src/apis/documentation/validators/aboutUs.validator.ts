// dtos/aboutUs.dto.ts
export interface AboutUsDto {
  title: string;
  content: string;
}

// validators/aboutUs.validator.ts
import { z } from "zod";

export const aboutUsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});
