import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const pathFile = path.join(__dirname, 'files/fileToCompress.txt');
    const pathGzip = path.join(__dirname, 'files/archive.gz');

    const gzip = createGzip();
    const source = createReadStream(pathFile);
    const destination = createWriteStream(pathGzip);

    pipeline(source, gzip, destination, (err) => err && console.error(err));
};

await compress();