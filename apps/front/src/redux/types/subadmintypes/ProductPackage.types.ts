// Frontend version of IProductPackage (no mongoose imports)

export interface IProductPackage {
  _id?: string;                // optional on create (Mongo will generate it)
  name: string;                // "Glow & Go Pack"
  price: number;               // 599
  products: string[];          // ["Facewash", "Bleach"]
  tagline: string;             // "Quick glow for party"
  rating?: number;             // 4.7
  description: string;         // "Complete hair nourishment in one kit"
  discount?: string;           // "Save 300rs on combo purchase"
  items: string[];             // ["Shampoo (250ml)", "Conditioner (250ml)", ...]
  usageInstructions: string;   // "Use shampoo & conditioner twice weekly..."
  stock: number;               // inventory count
  addedBy: string;             // admin id (ObjectId in string format)
  createdAt: Date;             // from backend
  updatedAt: Date;             // from backend
}
