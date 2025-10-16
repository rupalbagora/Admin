import Certificate from "../models/certificate.model";
import { ICertificate } from "../types/certificate.types";

class CertificateService {
  async create(title: string, imageUrl: string, addedBy: string): Promise<ICertificate> {
    const cert = new Certificate({ title, imageUrl, addedBy });
    return cert.save();
  }

  async getByUser(userId: string): Promise<ICertificate[]> {
    return Certificate.find({ addedBy: userId }).sort({ createdAt: -1 });
  }

  async deleteById(id: string): Promise<ICertificate | null> {
    return Certificate.findByIdAndDelete(id);
  }

  async getById(id: string): Promise<ICertificate | null> {
    return Certificate.findById(id);
  }
}

export default new CertificateService();
