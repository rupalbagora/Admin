export interface CreateProductPackageDto {
  name: string;
  price: number;
  products: string[];
  tagline: string;
  review: string;
  items: string[];
  offers: string;
  usage: string;
  image: string;
  gender: string; // ✅ Gender field in DTO
}