import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import path from 'path';

import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const hash = createHash('sha256');

    const pathFile = path.join(__dirname, 'files/fileToCalculateHashFor.txt');
    const input = createReadStream(pathFile);
    
    await pipeline(input, hash);
    stdout.write(hash.digest('hex'));
    /*
    input.on('readable', () => {
        const data = input.read();
        if (data)
          hash.update(data);
        else {
            stdout.write(hash.digest('hex'));
        }
      });
    */
};

await calculateHash();