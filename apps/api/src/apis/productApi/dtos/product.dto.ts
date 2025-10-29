export interface CreateProductDto {
  name: string;
  price: string;
  offer?: string;
  rating?: string;
  tag?: string;
  description?: string; // ✅ added new field
}
