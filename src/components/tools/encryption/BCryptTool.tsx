import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import bcrypt from 'bcryptjs';

const BCryptTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [rounds, setRounds] = useState('10');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const handleHash = async () => {
    try {
      if (!input) {
        toast({
          title: 'Error',
          description: 'Please enter a value to hash',
          variant: 'destructive',
        });
        return;
      }

      const salt = await bcrypt.genSalt(parseInt(rounds));
      const hash = await bcrypt.hash(input, salt);
      setOutput(hash);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to hash the input',
        variant: 'destructive',
      });
    }
  };

  const handleVerify = async () => {
    try {
      if (!input || !output) {
        toast({
          title: 'Error',
          description: 'Please provide both input and hash values',
          variant: 'destructive',
        });
        return;
      }

      const isValid = await bcrypt.compare(input, output);
      toast({
        title: isValid ? 'Success' : 'Failed',
        description: isValid ? 'Hash verification successful' : 'Hash verification failed',
        variant: isValid ? 'default' : 'destructive',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify the hash',
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
            <Label>Rounds (Cost Factor)</Label>
            <Select value={rounds} onValueChange={setRounds}>
              <SelectTrigger>
                <SelectValue placeholder="Select rounds" />
              </SelectTrigger>
              <SelectContent>
                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                  <SelectItem key={value} value={value.toString()}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleHash} className="flex-1">
              Generate Hash
            </Button>
            <Button onClick={handleVerify} variant="outline" className="flex-1">
              Verify Hash
            </Button>
          </div>

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

export default BCryptTool;