import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download, Instagram } from "lucide-react";

const InstagramPostGenerator: React.FC = () => {
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [likes, setLikes] = useState("0");
  const [comments, setComments] = useState("0");
  const [location, setLocation] = useState("");
  const [timestamp, setTimestamp] = useState("1h");

  const handleGenerateImage = () => {
    // Create a canvas element to generate the Instagram post image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions (Instagram post aspect ratio)
    canvas.width = 600;
    canvas.height = 750;

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw header
    ctx.fillStyle = "#000000";
    ctx.font = "bold 14px Arial";
    ctx.fillText(username, 60, 30);

    if (location) {
      ctx.fillStyle = "#262626";
      ctx.font = "12px Arial";
      ctx.fillText(location, 60, 50);
    }

    // Draw mock image placeholder
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 70, canvas.width, canvas.width);
    ctx.fillStyle = "#cccccc";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Image Placeholder", canvas.width / 2, canvas.width / 2);
    ctx.textAlign = "left";

    // Draw engagement section
    const startY = 90 + canvas.width;
    ctx.fillStyle = "#262626";
    ctx.font = "14px Arial";
    ctx.fillText(`${likes} likes`, 60, startY);

    // Draw caption
    ctx.fillStyle = "#262626";
    ctx.font = "14px Arial";
    let captionY = startY + 30;
    ctx.font = "bold 14px Arial";
    ctx.fillText(username, 60, captionY);
    
    // Word wrap the caption
    ctx.font = "14px Arial";
    const words = caption.split(" ");
    let line = "";
    let x = 60 + ctx.measureText(username + " ").width;
    for (let word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (x + metrics.width > canvas.width - 40) {
        ctx.fillText(line, x, captionY);
        line = word + " ";
        x = 60;
        captionY += 20;
      } else {
        line = testLine;
        if (x === 60) x = 60;
      }
    }
    ctx.fillText(line, x, captionY);

    // Draw comments and timestamp
    captionY += 30;
    ctx.fillStyle = "#8e8e8e";
    ctx.fillText(`View all ${comments} comments`, 60, captionY);
    captionY += 20;
    ctx.fillText(timestamp, 60, captionY);

    // Convert canvas to image and trigger download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "instagram-post.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Instagram post image generated and downloaded!");
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid w-full gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location (optional)</Label>
            <Input
              id="location"
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="h-24"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="likes">Likes</Label>
              <Input
                id="likes"
                type="number"
                min="0"
                value={likes}
                onChange={(e) => setLikes(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="comments">Comments</Label>
              <Input
                id="comments"
                type="number"
                min="0"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="timestamp">Time</Label>
              <Input
                id="timestamp"
                placeholder="1h"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleGenerateImage} className="w-full">
            <Instagram className="mr-2 h-4 w-4" />
            Generate Instagram Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstagramPostGenerator;