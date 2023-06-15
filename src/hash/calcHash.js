import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { pipeline } from 'stream/promises';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const hash = createHash('sha256');
    const pathFile = path.join(__dirname, 'files/fileToCalculateHashFor.txt');

    const input = createReadStream(pathFile);
    await pipeline(input, hash, hash.digest('hex'), stdout);
};

await calculateHash();