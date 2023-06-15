import { createUnzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const pathFile = path.join(__dirname, 'files/fileToCompress.txt');
    const pathGzip = path.join(__dirname, 'files/archive.gz');

    const unzip = createUnzip();
    const source = createReadStream(pathGzip);
    const destination = createWriteStream(pathFile);

    pipeline(source, unzip, destination, (err) => err && console.error(err));
};

await decompress();