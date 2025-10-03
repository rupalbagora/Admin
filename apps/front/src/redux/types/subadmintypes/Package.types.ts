// redux/types/subadmintypes/package.types.ts

export interface Package {
  id: string;           // Unique identifier for the package
  name: string;         // Name of the package
  description: string;  // Description of the package
  services: string;     // List of services (comma-separated or JSON string)
  price: number;        // Price of the package
  createdAt: string;    // ISO string of creation date
}
