import Package from "../models/packages.model";

class PackageService {
  async create(data: any) {
    const newPackage = new Package(data);
    return await newPackage.save();
  }

  async getAll() {
    return await Package.find().sort({ createdAt: -1 });
  }

  async getById(id: string) {
    return await Package.findById(id);
  }

  async updateById(id: string, data: any) {
    return await Package.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string) {
    return await Package.findByIdAndDelete(id);
  }
}

export default new PackageService();
