import { ICart } from "../types/cart.types";

export interface CreateCartDto extends Omit<ICart, "_id" | "createdAt" | "updatedAt"> {}
