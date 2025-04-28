import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import * as scryptJs from 'scrypt-js';
import { BufferPolyfill } from '@/lib/buffer-polyfill';

const SCryptTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [salt, setSalt] = useState('');
  const [costFactor, setCostFactor] = useState('16384'); // N
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncrypt = async () => {
    try {
      if (!input) {
        toast({
          title: 'Error',
          description: 'Please enter a value to hash',
          variant: 'destructive',
        });
        return;
      }

      const saltBytes = salt ? BufferPolyfill.from(salt) : crypto.getRandomValues(new Uint8Array(16));
      
      const N = parseInt(costFactor);
      const r = 8;
      const p = 1;
      const dkLen = 64;
      
      const inputBuffer = BufferPolyfill.from(input);
      const derivedKey = await scryptJs.scrypt(inputBuffer, saltBytes, N, r, p, dkLen);
      const result = `$scrypt$N=${costFactor},r=8,p=1$${BufferPolyfill.toString(saltBytes)}$${BufferPolyfill.toString(derivedKey)}`;
      setOutput(result);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to hash the input',
        variant: 'destructive',
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: 'Success',
      description: 'Hash copied to clipboard',
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Input
              placeholder="Enter text to hash"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Salt (Optional)</Label>
            <Input
              placeholder="Enter salt value (optional)"
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Cost Factor (N)</Label>
            <Select value={costFactor} onValueChange={setCostFactor}>
              <SelectTrigger>
                <SelectValue placeholder="Select cost factor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="16384">16384 (2^14)</SelectItem>
                <SelectItem value="32768">32768 (2^15)</SelectItem>
                <SelectItem value="65536">65536 (2^16)</SelectItem>
                <SelectItem value="131072">131072 (2^17)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleEncrypt} className="w-full">
            Generate Hash
          </Button>

          {output && (
            <div className="space-y-2">
              <Label>Hash Output</Label>
              <div className="relative">
                <Input value={output} readOnly />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SCryptTool;