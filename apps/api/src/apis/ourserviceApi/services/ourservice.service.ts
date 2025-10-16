// src/apis/ourserviceApi/services/ourservice.service.ts
import { IOurService } from "../types/ourservice.type";
import OurService from "../models/ourservice.model";

class OurServiceService {
  async create(data: {
    serviceName: string;
    price: number;
    title: string;
    highlights: string[];
    extra: { name: string; price: number }[];
    imageUrl: string;
    addedBy: string;
  }): Promise<IOurService> {
    const newService = new OurService(data);
    return newService.save();
  }

  async getByUser(userId: string): Promise<IOurService[]> {
    return OurService.find({ addedBy: userId })
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<IOurService | null> {
    return OurService.findByIdAndDelete(id);
  }
}

export default new OurServiceService();
