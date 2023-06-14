import { unlink, promises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filesName = path.join(__dirname, 'files/fileToRemove copy.txt');

    const errorMessage = 'FS operation failed';

    try {
        unlink(filesName, (err) => {
            if (err) {
                throw new Error(errorMessage);
            }
        });
    } catch (err) {
        console.error(err);
    }
};

await remove();