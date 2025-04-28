import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Download, Sticker } from "lucide-react";

const LineStickerDownloader: React.FC = () => {
  const [stickerUrl, setStickerUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const extractStickerId = (url: string) => {
    // Extract sticker ID from Line Store URL
    const matches = url.match(/stickershop\/product\/(\d+)/i) ||
                   url.match(/sticker\/(\d+)/i);
    return matches ? matches[1] : null;
  };

  const handleDownload = async () => {
    const stickerId = extractStickerId(stickerUrl);
    if (!stickerId) {
      toast.error("Invalid Line sticker URL");
      return;
    }

    setLoading(true);
    try {
      // Note: This is a placeholder for the actual sticker download implementation
      // In a real implementation, you would need to:
      // 1. Set up a backend service to handle Line sticker downloads
      // 2. Use appropriate APIs to fetch sticker data
      // 3. Handle the download through your backend API
      
      // Example sticker URL format:
      // https://stickershop.line-scdn.net/stickershop/v1/sticker/${stickerId}/android/sticker.png
      
      toast.info("This is a demo version. Backend implementation required for actual downloads.");
    } catch (error) {
      toast.error("Failed to download sticker");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid w-full gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sticker-url">Line Sticker URL</Label>
            <Input
              id="sticker-url"
              placeholder="https://store.line.me/stickershop/product/..."
              value={stickerUrl}
              onChange={(e) => setStickerUrl(e.target.value)}
            />
          </div>

          <Button
            onClick={handleDownload}
            disabled={!stickerUrl || loading}
            className="w-full"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Sticker className="mr-2 h-4 w-4" />
                Download Sticker
              </>
            )}
          </Button>

          <div className="text-sm text-muted-foreground">
            <p>Instructions:</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Visit the Line Store and find your desired sticker</li>
              <li>Copy the sticker URL from your browser</li>
              <li>Paste the URL above and click Download</li>
            </ol>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Note: This is a demo version. Please ensure you comply with Line's terms of service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineStickerDownloader;