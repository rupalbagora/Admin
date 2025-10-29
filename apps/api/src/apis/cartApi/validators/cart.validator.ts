import { z } from "zod";

export const createCartSchema = z.object({
  body: z.object({
    userId: z.string().nonempty("User ID is required"),
    productId: z.string().nonempty("Product ID is required"),
    name: z.string().nonempty("Name is required"),
    price: z.number().positive("Price must be positive"),
    quantity: z.number().int().positive("Quantity must be positive"),
    image: z.string().url("Valid image URL required"),
  }),
});
