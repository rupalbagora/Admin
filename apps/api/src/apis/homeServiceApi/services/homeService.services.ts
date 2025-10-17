import HomeService from "../models/homeService.model";
import { IHomeService } from "../types/homeService.types";

class HomeServiceService {
  async create(data: Partial<IHomeService>): Promise<IHomeService> {
    const service = new HomeService(data);
    return service.save();
  }

  async getAll(): Promise<IHomeService[]> {
    return HomeService.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IHomeService | null> {
    return HomeService.findById(id);
  }

  async updateById(id: string, data: Partial<IHomeService>): Promise<IHomeService | null> {
    return HomeService.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IHomeService | null> {
    return HomeService.findByIdAndDelete(id);
  }
}

export default new HomeServiceService();
