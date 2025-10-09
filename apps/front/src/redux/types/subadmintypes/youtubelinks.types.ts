// frontend types for youtube videos
export interface IYoutubeVideo {
  _id?: string;
  title: string;
  videoUrl?: string;   // optional (youtube link)
  videoPath?: string;  // optional (uploaded file path returned by backend)
  uploadedAt?: string;
  addedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface YoutubeState {
  videos: IYoutubeVideo[];
  video: IYoutubeVideo | null;
  loading: boolean;
  error: string | null;
}
