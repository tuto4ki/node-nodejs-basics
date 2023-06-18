import { access, appendFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const pathFile = path.join(__dirname, 'files/fresh.txt');
    const contentFile = 'I am fresh and young';
    const errorText = 'FS operation failed';

    try {
        await access(pathFile);
        throw new Error(errorText);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await appendFile(pathFile, contentFile);
        } else {
            console.error(error.message);
        }
    }
};

await create();