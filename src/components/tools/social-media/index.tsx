import { Youtube, Twitter, Instagram, Sticker, TrendingUp, Tag } from "lucide-react";
import YoutubeThumbnailDownloader from "./YoutubeThumbnailDownloader";
import YoutubeVideoDownloader from "./YoutubeVideoDownloader";
import TweetGenerator from "./TweetGenerator";
import InstagramPostGenerator from "./InstagramPostGenerator";
import LineStickerDownloader from "./LineStickerDownloader";
import YoutubeTrendingVideos from "./YoutubeTrendingVideos";
import YoutubeTagsExtractor from "./YoutubeTagsExtractor";

const socialMedia = {
  "yt-thumbnail": YoutubeThumbnailDownloader,
  "yt-video": YoutubeVideoDownloader,
  "tweet-generator": TweetGenerator,
  "instagram-post": InstagramPostGenerator,
  "line-sticker": LineStickerDownloader,
  "yt-trending": YoutubeTrendingVideos,
  "yt-tags": YoutubeTagsExtractor,
};

export default socialMedia;