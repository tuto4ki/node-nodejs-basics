import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const filesOldName = path.join(__dirname, 'files/wrongFilename.txt');
    const fileNewName = path.join(__dirname, 'files/properFilename.md');

    const errorMessage = 'FS operation failed';
    
    
    fs.stat(fileNewName, (err) => {
        if (!err) {
            throw new Error(errorMessage);
        } else if (err.code === 'ENOENT') {
            fs.rename(filesOldName, fileNewName, (err) => {
                if (err?.code === 'ENOENT') {
                    throw new Error(errorMessage);
                }
            });
        }
    });
};

await rename();