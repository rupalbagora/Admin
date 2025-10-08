import ProductPackage from "../models/productPackage.model";
import { IProductPackage } from "../types/productPackage.types";

class ProductPackageService {
  async create(data: Partial<IProductPackage>): Promise<IProductPackage> {
    const pkg = new ProductPackage(data);
    return pkg.save();
  }

  async getAll(userId: string) {
    return ProductPackage.find({ addedBy: userId }).sort({ createdAt: -1 });
  }

  async getById(id: string) {
    return ProductPackage.findById(id);
  }

  async deleteById(id: string) {
    return ProductPackage.findByIdAndDelete(id);
  }
}

export default new ProductPackageService();
