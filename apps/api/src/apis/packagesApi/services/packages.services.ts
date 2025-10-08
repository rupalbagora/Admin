import { IPackage } from "../types/packages.types";
import Package from "../models/packages.models"
class PackageService {
  async create(data: Partial<IPackage>): Promise<IPackage> {
    const pkg = new Package(data);
    return pkg.save();
  }

  // services/packages.services.ts
  async getAll(userId: string, category?: string) {
    const filter: any = { addedBy: userId }; // ✅ filter by logged-in user
    if (category) filter.category = category;

    return Package.find(filter).sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IPackage | null> {
    return Package.findById(id);
  }

  async deleteById(id: string): Promise<IPackage | null> {
    return Package.findByIdAndDelete(id);
  }
}

export default new PackageService();
