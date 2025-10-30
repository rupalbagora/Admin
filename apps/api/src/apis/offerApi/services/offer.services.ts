import Offer, { IOffer } from "../models/offer.model";

class OfferService {
  async create(data: {
    title: string;
    discount: string;
    date: string;
    description?: string;
    imageUrl: string;
    addedBy: string;
  }): Promise<IOffer> {
    const newOffer = new Offer(data);
    return newOffer.save();
  }

  async getAll(): Promise<IOffer[]> {
    return Offer.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IOffer | null> {
    return Offer.findById(id);
  }

  async updateById(id: string, data: Partial<IOffer>): Promise<IOffer | null> {
    return Offer.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<IOffer | null> {
    return Offer.findByIdAndDelete(id);
  }
}

export default new OfferService();
