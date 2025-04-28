import TweetGenerator from './tweet-generator';
import InstagramPost from './instagram-post';
import YoutubeThumbnailDownloader from './YoutubeThumbnailDownloader';
import LineStickerDownloader from './LineStickerDownloader';
import YoutubeVideoDownloader from './YoutubeVideoDownloader';
import YoutubeTrendingVideos from './YoutubeTrendingVideos';
import YoutubeTagsExtractor from './YoutubeTagsExtractor';


const socialMediaTools = {
  'tweet-generator': TweetGenerator,
  'instagram-post': InstagramPost,
  'yt-thumbnail': YoutubeThumbnailDownloader,
  'line-sticker': LineStickerDownloader,
  'yt-video': YoutubeVideoDownloader,
  'yt-trending': YoutubeTrendingVideos,
  'yt-tags': YoutubeTagsExtractor
};

export default socialMediaTools;