import YoutubeVideo from "../models/youtube.models";
import { IYoutubeVideo } from "../types/youtube.types";

class YoutubeService {
  async create(data: Partial<IYoutubeVideo>): Promise<IYoutubeVideo> {
    const video = new YoutubeVideo(data);
    return video.save();
  }

  async getAll(): Promise<IYoutubeVideo[]> {
    return YoutubeVideo.find().sort({ createdAt: -1 });
  }

  async getById(id: string): Promise<IYoutubeVideo | null> {
    return YoutubeVideo.findById(id);
  }

  async getByDate(date: string): Promise<IYoutubeVideo[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return YoutubeVideo.find({
      uploadedAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });
  }

  async updateById(
    id: string,
    data: Partial<IYoutubeVideo>
  ): Promise<IYoutubeVideo | null> {
    return YoutubeVideo.findByIdAndUpdate(
      id, 
      { $set: data }, 
      { new: true, runValidators: true }
    );
  }

  async deleteById(id: string): Promise<IYoutubeVideo | null> {
    return YoutubeVideo.findByIdAndDelete(id);
  }
}

export default new YoutubeService();