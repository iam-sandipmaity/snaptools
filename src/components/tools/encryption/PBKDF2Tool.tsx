import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { BufferPolyfill } from '@/lib/buffer-polyfill';
import CryptoJS from 'crypto-js';

const PBKDF2Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [salt, setSalt] = useState('');
  const [iterations, setIterations] = useState('10000');
  const [hashFunction, setHashFunction] = useState('sha256');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleEncrypt = () => {
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
      
      // Use CryptoJS for PBKDF2 in browser environment
      const keySize = 32;
      const derivedKey = CryptoJS.PBKDF2(input, CryptoJS.lib.WordArray.create(saltBytes), {
        keySize: keySize / 4,
        iterations: parseInt(iterations),
        hasher: CryptoJS[hashFunction.toUpperCase()]
      });

      const result = `$pbkdf2$i=${iterations},h=${hashFunction}$${BufferPolyfill.toString(saltBytes)}$${derivedKey.toString(CryptoJS.enc.Base64)}`;
      setOutput(result);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to derive key',
        variant: 'destructive',
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: 'Success',
      description: 'Key copied to clipboard',
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Input Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
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
            <Label>Iterations</Label>
            <Select value={iterations} onValueChange={setIterations}>
              <SelectTrigger>
                <SelectValue placeholder="Select iterations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1000">1,000</SelectItem>
                <SelectItem value="10000">10,000</SelectItem>
                <SelectItem value="100000">100,000</SelectItem>
                <SelectItem value="200000">200,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Hash Function</Label>
            <Select value={hashFunction} onValueChange={setHashFunction}>
              <SelectTrigger>
                <SelectValue placeholder="Select hash function" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sha256">SHA-256</SelectItem>
                <SelectItem value="sha512">SHA-512</SelectItem>
                <SelectItem value="sha1">SHA-1</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleEncrypt} className="w-full">
            Generate Key
          </Button>

          {output && (
            <div className="space-y-2">
              <Label>Derived Key</Label>
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

export default PBKDF2Tool;