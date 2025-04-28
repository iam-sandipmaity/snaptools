import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const URLEncodeTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encodeURL = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to encode'
        });
        return;
      }
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Encoding Error',
        description: 'Failed to encode text'
      });
    }
  };

  const decodeURL = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to decode'
        });
        return;
      }
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Decoding Error',
        description: 'Failed to decode text. Please check your input.'
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Text copied to clipboard'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Failed to copy text to clipboard'
      });
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Paste Failed',
        description: 'Failed to paste text from clipboard'
      });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder="Enter text to encode/decode"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px]"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={pasteFromClipboard}
                title="Paste from clipboard"
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button onClick={encodeURL} className="flex-1">
              URL Encode
            </Button>
            <Button onClick={decodeURL} className="flex-1">
              URL Decode
            </Button>
          </div>

          {/* Output Section */}
          {output && (
            <div className="space-y-2">
              <Label>Output</Label>
              <div className="flex gap-2">
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[100px]"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(output)}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default URLEncodeTool;