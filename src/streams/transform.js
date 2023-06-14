import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
    const upperCaseTr = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, chunk.toString().split('').reverse().join('') + '\n');
        }
    });

    await pipeline(process.stdin, upperCaseTr, process.stdout);
};

await transform();