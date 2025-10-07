// src/apis/youtubeApi/services/youtube.service.ts
import YoutubeLink from "../models/youtube.models";

class YoutubeService {
  async create(youtubeLinks: string[], addedBy: string, date?: Date) {
    return YoutubeLink.create({
      youtubeLinks,
      addedBy,
      date: date ?? new Date(),
    });
  }

  async updateById(id: string, youtubeLinks: string[], date?: Date) {
    return YoutubeLink.findByIdAndUpdate(
      id,
      { youtubeLinks, date: date ?? new Date() },
      { new: true }
    );
  }

  async getById(id: string) {
    return YoutubeLink.findById(id);
  }

  async getAll() {
    return YoutubeLink.find().sort({ _id: -1 });
  }

  async getByDate(date: string) {
    const startOn = new Date(date).setHours(0, 0, 0, 0);
    const endOn = new Date(date).setHours(23, 59, 59, 999);
    return YoutubeLink.find({ date: { $gte: startOn, $lte: endOn } }).sort({
      _id: -1,
    });
  }

  async deleteById(id: string) {
    return YoutubeLink.findByIdAndDelete(id);
  }
}

export default new YoutubeService();
