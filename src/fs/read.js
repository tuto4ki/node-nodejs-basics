import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const fileName = path.join(__dirname, 'files/fileToRead.txt');
    const errorMessage = 'FS operation failed';

    try {
        const data = await readFile(fileName, 'utf8').catch((err) => {
            if(err.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
        });
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
};

await read();