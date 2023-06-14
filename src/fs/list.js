import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const dirName =  path.join(__dirname, 'files');
    const errorMessage = 'FS operation failed';

    fs.readdir(dirName,
        (error, items) => {
            if (error?.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
            for (let i = 0; i < items.length; i++) {
                process.stdout.write(`${items[i]}\n`);
            }
        }
    );
};

await list();