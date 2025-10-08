export interface CreateProductPackageDto {
  name: string;
  price: number;
  products: string[];
  tagline: string;
  rating?: number;
  description: string;
  discount?: string;
  items: string[];
  usageInstructions: string;
  stock: number;
}
