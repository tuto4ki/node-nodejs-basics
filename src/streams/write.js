import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const write = async () => {
    const fileName = path.join(__dirname, 'files/fileToWrite.txt');
    const readStream = createWriteStream(fileName, 'utf-8');
    
    await pipeline(process.stdin, readStream);
};

await write();