// src/apis/ourserviceApi/dtos/ourservice.dto.ts
export interface CreateOurServiceDto {
  serviceName: string;
  price: number;
  title: string;
  highlights: string[];
  extra: { name: string; price: number }[];
  imageUrl: string;
}
