export interface CreateYoutubeDto {
  title: string;
  videoUrl: string;
  uploadedAt?: Date; // optional, default is current date
}
