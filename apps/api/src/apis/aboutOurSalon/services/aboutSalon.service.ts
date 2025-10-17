import AboutSalon from "../models/aboutSalon.model";
import { IAboutSalon } from "../types/aboutSalon.types";

class AboutSalonService {
  async create(title: string, description: string, image: string, addedBy: string): Promise<IAboutSalon> {
    const salon = new AboutSalon({ title, description, image, addedBy });
    return salon.save();
  }
  
  async getByUser(userId: string): Promise<IAboutSalon[]> {
    return AboutSalon.find({ addedBy: userId }).sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IAboutSalon | null> {
    return AboutSalon.findById(id);
  }

  async deleteById(id: string): Promise<IAboutSalon | null> {
    return AboutSalon.findByIdAndDelete(id);
  }

  async update(id: string, updateData: Partial<IAboutSalon>): Promise<IAboutSalon | null> {
    return AboutSalon.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }
}

export default new AboutSalonService();
