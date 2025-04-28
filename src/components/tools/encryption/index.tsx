import React from 'react';
import { EncryptionToolComponentMap } from '@/types/encryption';
import AESTool from './AESTool';
import Base64Tool from './Base64Tool';
import DESTool from './DESTool';
import EncodingTool from './EncodingTool';
import HTMLEncodeTool from './HTMLEncodeTool';
import MD5Tool from './MD5Tool';
import RIPEMD160Tool from './RIPEMD160Tool';
import SHATool from './SHATool';
import SHA3Tool from './SHA3Tool';
import URLEncodeTool from './URLEncodeTool';
import BCryptTool from './BCryptTool';
import SCryptTool from './SCryptTool';
import PBKDF2Tool from './PBKDF2Tool';

const encryptionTools: EncryptionToolComponentMap = {
  'aes': AESTool,
  'base64': Base64Tool,
  'des': DESTool,
  'encoding': EncodingTool,
  'html-encode': HTMLEncodeTool,
  'md5': MD5Tool,
  'ripemd160': RIPEMD160Tool,
  'sha': SHATool,
  'sha3': SHA3Tool,
  'url-encode': URLEncodeTool,
  'bcrypt': BCryptTool,
  'scrypt': SCryptTool,
  'pbkdf2': PBKDF2Tool
};



export default encryptionTools;