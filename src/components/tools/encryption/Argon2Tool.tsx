// /**
//  * Argon2 Password Hashing Tool Component
//  *
//  * Argon2 is a state-of-the-art password hashing algorithm that won the Password Hashing Competition in 2015.
//  * It is designed to be memory-hard and highly resistant to both GPU-based and ASIC-based attacks.
//  * The algorithm provides three variants: Argon2i, Argon2d, and Argon2id, each optimized for different use cases.
//  *
//  * Key Features:
//  * - Memory-hard algorithm (requires significant RAM)
//  * - Configurable parameters (iterations, memory, parallelism)
//  * - Built-in salt generation
//  * - Multiple variants for different security needs
//  *
//  * Parameters:
//  * - iterations: Number of iterations (time cost)
//  * - memory: Memory usage in KiB
//  * - parallelism: Degree of parallelism (threads)
//  * - hashLength: Length of the output hash
//  *
//  * Common Use Cases:
//  * - Password hashing in high-security environments
//  * - Key derivation for encryption
//  * - Proof of work systems
//  *
//  * Security Considerations:
//  * - Choose parameters based on available system resources
//  * - Higher memory cost provides better protection against GPU attacks
//  * - Use cryptographically secure salt values
//  * - Store all parameters with the hash output
//  */

// import React, { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/components/ui/use-toast';
// import * as argon2 from 'argon2-browser';

// const Argon2Tool: React.FC = () => {
//   const [input, setInput] = useState('');
//   const [salt, setSalt] = useState('');
//   const [iterations, setIterations] = useState('3');
//   const [memory, setMemory] = useState('65536'); // 64 MB
//   const [parallelism, setParallelism] = useState('4');
//   const [variant, setVariant] = useState('argon2id');
//   const [output, setOutput] = useState('');
//   const { toast } = useToast();

//   const handleHash = async () => {
//     try {
//       if (!input) {
//         toast({
//           title: 'Error',
//           description: 'Please enter a value to hash',
//           variant: 'destructive',
//         });
//         return;
//       }

//       const saltBytes = salt
//         ? new TextEncoder().encode(salt)
//         : crypto.getRandomValues(new Uint8Array(16));

//       const params = {
//         pass: input,
//         salt: saltBytes,
//         time: parseInt(iterations),
//         mem: parseInt(memory) / 1024, // Convert KB to MB for Argon2
//         parallelism: parseInt(parallelism),
//         type: variant === 'argon2i'
//           ? 0
//           : variant === 'argon2d'
//             ? 1
//             : 2,
//         hashLen: 32,
//       };

//       const result = await argon2.hash(params);
//       const encodedHash = result.encoded;
//       setOutput(encodedHash);
//     } catch (error) {
//       console.error('Argon2 hashing error:', error);
//       let errorMessage = 'Failed to hash the input';
      
//       if (error instanceof Error) {
//         if (error.message.includes('memory')) {
//           errorMessage = 'Not enough memory available. Try reducing the memory parameter.';
//         } else if (error.message.includes('load')) {
//           errorMessage = 'Failed to initialize Argon2 module. Please try again.';
//         } else if (error.message.toLowerCase().includes('invalid')) {
//           errorMessage = 'Invalid input parameters. Please check your settings.';
//         }
//       }

//       toast({
//         title: 'Error',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(output);
//     toast({
//       title: 'Success',
//       description: 'Hash copied to clipboard',
//     });
//   };

//   return (
//     <Card className="w-full max-w-3xl mx-auto">
//       <CardContent className="p-6">
//         <div className="space-y-4">
//           <div className="space-y-2 mb-6 text-sm text-muted-foreground">
//             <p className="font-medium text-foreground">Argon2 Password Hashing</p>
//             <p>Argon2 is a state-of-the-art password hashing algorithm designed to be memory-hard and highly resistant to both GPU-based and ASIC-based attacks. It won the Password Hashing Competition in 2015.</p>
//             <div className="mt-4">
//               <p className="font-medium text-foreground mb-2">Key Features:</p>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>Memory-hard algorithm requiring significant RAM</li>
//                 <li>Multiple variants for different security needs (Argon2i, Argon2d, Argon2id)</li>
//                 <li>Configurable parameters for security scaling</li>
//               </ul>
//             </div>
//             <div className="mt-4">
//               <p className="font-medium text-foreground mb-2">Security Tips:</p>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>Higher memory cost provides better protection against GPU attacks</li>
//                 <li>Increase iterations for stronger security (at the cost of performance)</li>
//                 <li>Use cryptographically secure random salt</li>
//               </ul>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Input Text</Label>
//             <Input
//               placeholder="Enter text to hash"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Salt (Optional)</Label>
//             <Input
//               placeholder="Enter salt value (optional)"
//               value={salt}
//               onChange={(e) => setSalt(e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Variant</Label>
//             <Select value={variant} onValueChange={setVariant}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Argon2 variant" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="argon2id">Argon2id (Recommended)</SelectItem>
//                 <SelectItem value="argon2i">Argon2i (Side-channel resistant)</SelectItem>
//                 <SelectItem value="argon2d">Argon2d (Fastest)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Iterations (Time Cost)</Label>
//             <Select value={iterations} onValueChange={setIterations}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select iterations" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="1">1 (Fastest)</SelectItem>
//                 <SelectItem value="2">2</SelectItem>
//                 <SelectItem value="3">3 (Recommended)</SelectItem>
//                 <SelectItem value="4">4</SelectItem>
//                 <SelectItem value="5">5 (Strongest)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Memory (KiB)</Label>
//             <Select value={memory} onValueChange={setMemory}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select memory cost" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="8192">8 MB</SelectItem>
//                 <SelectItem value="16384">16 MB</SelectItem>
//                 <SelectItem value="32768">32 MB</SelectItem>
//                 <SelectItem value="65536">64 MB (Recommended)</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="space-y-2">
//             <Label>Parallelism</Label>
//             <Select value={parallelism} onValueChange={setParallelism}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select parallelism factor" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="1">1 Thread</SelectItem>
//                 <SelectItem value="2">2 Threads</SelectItem>
//                 <SelectItem value="4">4 Threads (Recommended)</SelectItem>
//                 <SelectItem value="8">8 Threads</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <Button onClick={handleHash} className="w-full">
//             Generate Hash
//           </Button>

//           {output && (
//             <div className="space-y-2">
//               <Label>Hash Output</Label>
//               <div className="relative">
//                 <Input value={output} readOnly />
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2"
//                   onClick={handleCopy}
//                 >
//                   Copy
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Argon2Tool;
