import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().trim().split('').reverse().join('') + '\n');
        }
    });

    await pipeline(process.stdin, reverseTransform, process.stdout);
};

await transform();