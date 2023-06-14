import { readFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const fileName = path.join(__dirname, 'files/fileToRead.txt');
    
    const errorMessage = 'FS operation failed';

    readFile(fileName, 'utf8', (err, data) => {
        if(err) {
            if (err.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
            throw err;
        }

        console.log(data);
    });
};

await read();