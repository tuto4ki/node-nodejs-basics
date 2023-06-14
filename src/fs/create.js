import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const pathFile = path.join(__dirname, 'files/fresh.txt');
    const contentFile = 'I am fresh and young';
    const errorText = 'FS operation failed';
    try {
        fs.access(pathFile, function(error) {
            if(error == null) {
                throw new Error(errorText);
            } else if(error.code == 'ENOENT') {
                fs.appendFile(pathFile, contentFile, () => {});
            }
        });
    } catch(err) {
        console.error(err);
    }
};

await create();