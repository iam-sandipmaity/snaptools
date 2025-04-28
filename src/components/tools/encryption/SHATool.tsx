import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, Clipboard } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CryptoJS from 'crypto-js';

type SHAVariant = '1' | '256' | '384' | '512';

const SHATool = () => {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [variant, setVariant] = useState<SHAVariant>('256');
  const { toast } = useToast();

  const generateHash = () => {
    try {
      if (!input.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter text to generate hash'
        });
        return;
      }

      let shaHash: string;
      switch (variant) {
        case '1':
          shaHash = CryptoJS.SHA1(input).toString();
          break;
        case '256':
          shaHash = CryptoJS.SHA256(input).toString();
          break;
        case '384':
          shaHash = CryptoJS.SHA384(input).toString();
          break;
        case '512':
          shaHash = CryptoJS.SHA512(input).toString();
          break;
        default:
          shaHash = CryptoJS.SHA256(input).toString();
      }

      setHash(shaHash);
      setIsMatch(null);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Hash Generation Error',
        description: `Failed to generate SHA-${variant} hash`
      });
    }
  };

  const verifySHA = () => {
    try {
      if (!input.trim() || !verifyHash.trim()) {
        toast({
          variant: 'destructive',
          title: 'Input Required',
          description: 'Please enter both text and hash to verify'
        });
        return;
      }

      let generatedHash: string;
      switch (variant) {
        case '1':
          generatedHash = CryptoJS.SHA1(input).toString();
          break;
        case '256':
          generatedHash = CryptoJS.SHA256(input).toString();
          break;
        case '384':
          generatedHash = CryptoJS.SHA384(input).toString();
          break;
        case '512':
          generatedHash = CryptoJS.SHA512(input).toString();
          break;
        default:
          generatedHash = CryptoJS.SHA256(input).toString();
      }

      setIsMatch(generatedHash.toLowerCase() === verifyHash.toLowerCase());
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Verification Error',
        description: `Failed to verify SHA-${variant} hash`
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
          {/* SHA Variant Selection */}
          <div className="space-y-2">
            <Label>SHA Variant</Label>
            <Select
              value={variant}
              onValueChange={(value: SHAVariant) => setVariant(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select SHA variant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">SHA-1</SelectItem>
                <SelectItem value="256">SHA-256</SelectItem>
                <SelectItem value="384">SHA-384</SelectItem>
                <SelectItem value="512">SHA-512</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Input Section */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <div className="flex gap-2">
              <Textarea
                placeholder={`Enter text to generate SHA-${variant} hash`}
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

          {/* Hash Generation Section */}
          <div className="space-y-4">
            <Button onClick={generateHash} className="w-full">
              Generate SHA-{variant} Hash
            </Button>

            {hash && (
              <div className="space-y-2">
                <Label>Generated Hash</Label>
                <div className="flex gap-2">
                  <Input value={hash} readOnly />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(hash)}
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Hash Verification Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Verify SHA-{variant} Hash</Label>
              <Input
                placeholder={`Enter SHA-${variant} hash to verify`}
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
              />
            </div>

            <Button onClick={verifySHA} className="w-full">
              Verify Hash
            </Button>

            {isMatch !== null && (
              <div className={`text-center font-medium ${isMatch ? 'text-green-600' : 'text-red-600'}`}>
                {isMatch ? 'Hash matches!' : 'Hash does not match!'}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SHATool;