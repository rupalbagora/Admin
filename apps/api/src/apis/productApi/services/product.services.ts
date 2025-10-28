import Product, { IProduct } from "../models/product.model";

class ProductService {
  async create(data: Partial<IProduct>): Promise<IProduct> {
    return await Product.create(data);
  }

  async getAll(): Promise<IProduct[]> {
    return await Product.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  async updateById(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductService();
