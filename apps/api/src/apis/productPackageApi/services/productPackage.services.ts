import ProductPackage, { IProductPackage } from "../models/productPackage.model";

class ProductPackageService {
  async create(data: Partial<IProductPackage>): Promise<IProductPackage> {
    const pkg = new ProductPackage(data);
    return pkg.save();
  }

  async getAll(userId: string): Promise<IProductPackage[]> {
    return ProductPackage.find({ addedBy: userId }).sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IProductPackage | null> {
    return ProductPackage.findById(id);
  }

  async updateById(id: string, data: Partial<IProductPackage>): Promise<IProductPackage | null> {
    return ProductPackage.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IProductPackage | null> {
    return ProductPackage.findByIdAndDelete(id);
  }
}

export default new ProductPackageService();