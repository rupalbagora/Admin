import { ISpecialOffer } from "../types/specialoffers.types";
import SpecialOffer from "../models/specialoffers.models";

class SpecialOfferService {
  // 🟢 Create Special Offer
  async create(data: { tag: string; imageUrl: string; addedBy: string }): Promise<ISpecialOffer> {
    const newOffer = new SpecialOffer({
      tag: data.tag,
      image: data.imageUrl,
      addedBy: data.addedBy,
    });
    return newOffer.save();
  }

  // 🟠 Get All Offers
  async getAll(): Promise<ISpecialOffer[]> {
    return SpecialOffer.find()
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 });
  }

  // 🔵 Get Offer by ID
  async getById(id: string): Promise<ISpecialOffer | null> {
    return SpecialOffer.findById(id).populate("addedBy", "name email");
  }

  // 🟣 Update Offer by ID
  async updateById(id: string, data: { tag?: string; image?: string }): Promise<ISpecialOffer | null> {
    return SpecialOffer.findByIdAndUpdate(id, data, { new: true });
  }

  // 🔴 Delete Offer by ID
  async deleteById(id: string): Promise<ISpecialOffer | null> {
    return SpecialOffer.findByIdAndDelete(id);
  }
}

export default new SpecialOfferService();
