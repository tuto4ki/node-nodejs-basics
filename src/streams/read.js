import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const fileName = path.join(__dirname, 'files/fileToRead.txt');
    const readStream = createReadStream(fileName, 'utf-8');
    
    await pipeline(readStream, process.stdout);
};

await read();