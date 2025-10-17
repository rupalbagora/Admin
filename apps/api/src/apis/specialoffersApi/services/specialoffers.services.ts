import { ISpecialOffer } from "../types/specialoffers.types";
import SpecialOffer from "../models/specialoffers.models";

class SpecialOfferService {
  // 🟢 Create Special Offer
  async create(data: {
    tag: string;
    imageUrl: string;
    addedBy: string;
  }): Promise<ISpecialOffer> {
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

  // 🔴 Delete Offer by ID
  async deleteById(id: string): Promise<ISpecialOffer | null> {
    return SpecialOffer.findByIdAndDelete(id);
  }
}

export default new SpecialOfferService();
