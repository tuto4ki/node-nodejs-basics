import { unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filesName = path.join(__dirname, 'files/fileToRemove copy.txt');
    const errorMessage = 'FS operation failed';

    try {
        await unlink(filesName).catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
        });
    } catch(err) {
        console.error(err.message);
    }
};

await remove();