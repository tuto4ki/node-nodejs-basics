import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const dirName =  path.join(__dirname, 'files');
    const errorMessage = 'FS operation failed';

    try {
        const files = await readdir(dirName).catch((err) => {
            if (err?.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
        });
        for (const file of files) {
            process.stdout.write(`${file}\n`);
        }
    } catch (error) {
        console.log(error.message);
    }
};

await list();