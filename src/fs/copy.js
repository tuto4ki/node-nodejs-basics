import { mkdir, copyFile, readdir, stat, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyDirectory = async (dirName, dirNameCopy) => {
    const files = await readdir(dirName, { recursive: true });

    for(let file of files) {
        let isFile = await stat(path.join(dirName, file));
        if (isFile.isFile()) {
            await copyFile(path.join (dirName, file), path.join (dirNameCopy, file));
        }
        else {
            await mkdir (path.join (dirNameCopy, file), { recursive: true });
            await copyDirectory (path.join (dirName, file), path.join (dirNameCopy, file));
        }
    }
}

const copy = async () => {
    const dirName = path.join(__dirname, 'files');
    const dirNameCopy = path.join(__dirname, 'files_copy');
    const errorMessage = 'FS operation failed';

    try {
        await access(dirName).catch((err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    throw new Error(errorMessage);
                }
            }
        });

        await mkdir(dirNameCopy, { recursive: false }).catch((err) => {
            if (err) {
                if (err.code == 'EEXIST') {
                    throw new Error(errorMessage);
                }
            }
        });

        await copyDirectory(dirName, dirNameCopy);
    } catch (err) {
        console.error(err);
    }
};

await copy();
