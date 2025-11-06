export interface Package {
  _id?: string;
  id?: string; 
  title: string;
  price: string;
  services: string; 
  about: string;
  image?: string;
  discount?: string;
  review?: number;
  rating?: number;
  serviceList: string[]; 
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
}
