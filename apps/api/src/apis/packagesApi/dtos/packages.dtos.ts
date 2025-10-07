export interface CreatePackageDto {
  title: string;
  price: number;
  services: string[];
  about: string;
  discount?: string;
  serviceList: string[];
  ratings?: number;
  category: "male" | "female"|"Male"|"Female";
}
