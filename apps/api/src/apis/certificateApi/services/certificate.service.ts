import { ICertificate } from "../types/certificate.types";
import Certificate from "../models/certificate.model"

class CertificateService {
  async create(
    title: string,
    imageUrl: string,
    addedBy: string
  ): Promise<ICertificate> {
    const certificate = new Certificate({ title, imageUrl, addedBy });
    return certificate.save();
  }

  // async getAll(): Promise<ICertificate[]> {
  //   return Certificate.find().populate("addedBy", "name email");
  // }

  async getByUser(userId: string): Promise<ICertificate[]> {
    return Certificate.find({ addedBy: userId })
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 }); // optional: newest first
  }

  async deleteById(id: string): Promise<ICertificate | null> {
    return Certificate.findByIdAndDelete(id);
  }
}

export default new CertificateService();
