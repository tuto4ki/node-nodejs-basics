import { Writable } from 'stream';
import { pipeline } from 'stream/promises';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const write = async () => {
    const fileName = path.join(__dirname, 'files/fileToWrite.txt');

    class MyWritable extends Writable {
        constructor(fileName) {
          super();
          this.fileName = fileName;
          this.fileDescriptor = null;
        }

        _construct(callback) {
            fs.open(this.fileName, 'a', (error, fileDescriptor) => {
                if (error) {
                    callback(error);
                } else {
                    this.fileDescriptor = fileDescriptor;
                    callback();
                }
            });
        }
       
        _write(chunk, encoding, callback) {
            fs.write(this.fileDescriptor, chunk, callback);
        }
        
        _destroy(error, callback) {
            if (this.fileDescriptor) {
                fs.close(this.fileDescriptor, (errorClose) => error ? callback(error) : callback(errorClose));
            } else {
                callback(error);
            }
        }
      }
       
      const writable = new MyWritable(fileName);
    
    await pipeline(process.stdin, writable);
};

await write();