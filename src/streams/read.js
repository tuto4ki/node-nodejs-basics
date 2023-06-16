import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const fileName = path.join(__dirname, 'files/fileToRead.txt');
    class MyReadable extends Readable {
        constructor(fileName, encoding) {
          super();
          this.fileName = fileName;
          this.fileDescriptor = null;
          this.setEncoding = encoding;
        }

        _construct(callback) {
            fs.open(this.fileName, (error, fileDescriptor) => {
                if (error) {
                    callback(error);
                } else {
                    this.fileDescriptor = fileDescriptor;
                    callback();
                }
            });
        }
       
        _read(size) {
            const buffer = Buffer.alloc(size);
            fs.read(this.fileDescriptor, buffer, 0, size, null, (error, bytes) => {
                if (error) {
                    this.destroy(error);
                } else {
                    this.push(bytes ? buffer : null);
                }
            });
        }
        
        _destroy(error, callback) {
            if (this.fileDescriptor) {
                fs.close(this.fileDescriptor, (errorClose) => error ? callback(error) : callback(errorClose));
            } else {
                callback(error);
            }
        }
      }
       
      const readable = new MyReadable(fileName, 'utf8');

      pipeline(readable, process.stdout);
};

await read();