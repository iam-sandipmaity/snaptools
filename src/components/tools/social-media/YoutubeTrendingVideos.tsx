import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { TrendingUp } from "lucide-react";

interface TrendingVideo {
  title: string;
  channelTitle: string;
  viewCount: string;
  publishedAt: string;
  thumbnailUrl: string;
  videoId: string;
}

const YoutubeTrendingVideos: React.FC = () => {
  const [region, setRegion] = useState("US");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<TrendingVideo[]>([]);

  const regions = [
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "KR", label: "South Korea" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
    { value: "RU", label: "Russia" },
  ];

  const fetchTrendingVideos = async () => {
    setLoading(true);
    try {
      // Note: This is a placeholder for the actual API implementation
      // In a real implementation, you would need to:
      // 1. Set up a backend service with YouTube Data API
      // 2. Make API calls through your backend
      // 3. Handle rate limiting and API quotas
      
      toast.info("This is a demo version. Backend implementation required for actual data.");
      
      // Simulate some demo data
      const demoVideos: TrendingVideo[] = [
        {
          title: "Demo Trending Video 1",
          channelTitle: "Demo Channel",
          viewCount: "1M",
          publishedAt: "2 hours ago",
          thumbnailUrl: "https://via.placeholder.com/320x180.png",
          videoId: "demo1",
        },
        {
          title: "Demo Trending Video 2",
          channelTitle: "Another Channel",
          viewCount: "500K",
          publishedAt: "5 hours ago",
          thumbnailUrl: "https://via.placeholder.com/320x180.png",
          videoId: "demo2",
        },
      ];
      setVideos(demoVideos);
    } catch (error) {
      toast.error("Failed to fetch trending videos");
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    fetchTrendingVideos();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid w-full gap-6">
          <div className="flex flex-col gap-2">
            <Label>Select Region</Label>
            <Select value={region} onValueChange={handleRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="text-center py-8">Loading trending videos...</div>
            ) : videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video.videoId}
                  className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-40 h-24 object-cover rounded"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground">{video.channelTitle}</p>
                    <div className="flex gap-2 text-sm text-muted-foreground">
                      <span>{video.viewCount} views</span>
                      <span>·</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <TrendingUp className="mx-auto h-12 w-12 mb-2" />
                <p>Select a region to see trending videos</p>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Note: This is a demo version. Please ensure you comply with YouTube's terms of service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YoutubeTrendingVideos;