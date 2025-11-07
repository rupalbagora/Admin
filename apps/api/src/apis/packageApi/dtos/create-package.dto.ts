export interface CreatePackageDto {
  title: string;
  price: string;
  services: string;
  about: string;
  image: string;
  discount?: string;
  review?: number;
  rating?: number;
  gender: string; 
}
