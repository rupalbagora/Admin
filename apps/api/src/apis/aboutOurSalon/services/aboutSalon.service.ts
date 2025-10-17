import AboutSalon, { IAboutSalon } from "../models/aboutSalon.model";

class AboutSalonService {
  async create(data: Partial<IAboutSalon>): Promise<IAboutSalon> {
    const salon = new AboutSalon(data);
    return salon.save();
  }

  async getAll(): Promise<IAboutSalon[]> {
    return AboutSalon.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IAboutSalon | null> {
    return AboutSalon.findById(id);
  }

  async updateById(id: string, data: Partial<IAboutSalon>): Promise<IAboutSalon | null> {
    return AboutSalon.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IAboutSalon | null> {
    return AboutSalon.findByIdAndDelete(id);
  }
}

export default new AboutSalonService();
