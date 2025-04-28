import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download, Twitter } from "lucide-react";

const TweetGenerator: React.FC = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [tweetContent, setTweetContent] = useState("");
  const [likes, setLikes] = useState("0");
  const [retweets, setRetweets] = useState("0");
  const [replies, setReplies] = useState("0");
  const [timestamp, setTimestamp] = useState("now");

  const handleGenerateImage = () => {
    // Create a canvas element to generate the tweet image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 600;
    canvas.height = 300;

    // Set background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw tweet content
    ctx.fillStyle = "#000000";
    ctx.font = "bold 16px Arial";
    ctx.fillText(displayName, 60, 30);
    
    ctx.fillStyle = "#536471";
    ctx.font = "14px Arial";
    ctx.fillText(`@${username} · ${timestamp}`, 60, 50);

    ctx.fillStyle = "#000000";
    ctx.font = "16px Arial";
    // Word wrap the tweet content
    const words = tweetContent.split(" ");
    let line = "";
    let y = 80;
    for (let word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > canvas.width - 80) {
        ctx.fillText(line, 60, y);
        line = word + " ";
        y += 25;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 60, y);

    // Draw engagement metrics
    y += 40;
    ctx.fillStyle = "#536471";
    ctx.font = "14px Arial";
    ctx.fillText(`${replies} Replies    ${retweets} Retweets    ${likes} Likes`, 60, y);

    // Convert canvas to image and trigger download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "tweet.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Tweet image generated and downloaded!");
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
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="tweetContent">Tweet Content</Label>
            <Textarea
              id="tweetContent"
              placeholder="What's happening?"
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              className="h-24"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
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
              <Label htmlFor="retweets">Retweets</Label>
              <Input
                id="retweets"
                type="number"
                min="0"
                value={retweets}
                onChange={(e) => setRetweets(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="replies">Replies</Label>
              <Input
                id="replies"
                type="number"
                min="0"
                value={replies}
                onChange={(e) => setReplies(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="timestamp">Time</Label>
              <Input
                id="timestamp"
                placeholder="now"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleGenerateImage} className="w-full">
            <Twitter className="mr-2 h-4 w-4" />
            Generate Tweet Image
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetGenerator;