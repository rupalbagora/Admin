export interface CreateProductPackageDto {
  name: string;
  price: number;
  review?: string;
  description?: string;
  offers?: string;
  items: string[];
  usage?: string;
  image?: string;
  gender?: string;
  addedBy: string;
}

export interface UpdateProductPackageDto {
  name?: string;
  price?: number;
  review?: string;
  description?: string;
  offers?: string;
  items?: string[];
  usage?: string;
  image?: string;
  gender?: string;
}
