import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import BasePreview from './preview/base-preview';
import { Twitter } from 'lucide-react';

interface TweetPreviewProps {
  username: string;
  content: string;
}

const TweetPreview: React.FC<TweetPreviewProps> = ({ username, content }) => {
  return (
    <Card className="w-full max-w-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <Twitter className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-semibold">{username || 'Username'}</p>
          <p className="text-sm text-muted-foreground">@{username.toLowerCase().replace(/\s+/g, '') || 'username'}</p>
        </div>
      </div>
      <p className="text-[15px] leading-normal">{content || 'Your tweet content will appear here'}</p>
    </Card>
  );
};

const TweetGenerator = () => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading tweet...');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Username</label>
          <Input
            placeholder="Enter your Twitter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Tweet Content</label>
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <BasePreview title="Preview">
        <TweetPreview username={username} content={content} />
      </BasePreview>

      <Button
        className="w-full"
        size="lg"
        onClick={handleDownload}
        disabled={!username || !content}
      >
        Download Tweet Image
      </Button>
    </div>
  );
};

export default TweetGenerator;