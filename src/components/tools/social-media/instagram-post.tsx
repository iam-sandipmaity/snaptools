import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import BasePreview from './preview/base-preview';
import { Instagram } from 'lucide-react';

interface InstagramPreviewProps {
  username: string;
  caption: string;
  imageUrl?: string;
}

const InstagramPreview: React.FC<InstagramPreviewProps> = ({ username, caption, imageUrl }) => {
  return (
    <Card className="w-full max-w-xl overflow-hidden">
      <div className="aspect-square bg-muted flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Post preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Instagram className="w-12 h-12 mb-2" />
            <p className="text-sm">Upload an image to preview</p>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            <Instagram className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="font-semibold">{username || 'username'}</p>
        </div>
        <p className="text-sm leading-normal">
          <span className="font-semibold mr-2">{username || 'username'}</span>
          {caption || 'Your caption will appear here'}
        </p>
      </div>
    </Card>
  );
};

const InstagramPost = () => {
  const [username, setUsername] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Downloading Instagram post...');
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Username</label>
          <Input
            placeholder="Enter your Instagram username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Image</label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="cursor-pointer"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Caption</label>
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <BasePreview title="Preview">
        <InstagramPreview
          username={username}
          caption={caption}
          imageUrl={imageUrl}
        />
      </BasePreview>

      <Button
        className="w-full"
        size="lg"
        onClick={handleDownload}
        disabled={!username || !caption || !imageUrl}
      >
        Download Instagram Post
      </Button>
    </div>
  );
};

export default InstagramPost;