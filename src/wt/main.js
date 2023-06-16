import { cpus } from 'os';
import { Worker } from 'worker_threads';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    const pathFile = path.join(__dirname, 'worker.js');
    const numCPUs = cpus().length;
    
    const funcWorker = (number) => {
        return new Promise((resolve, reject) => {
          const worker = new Worker(pathFile, {
            workerData: number,
          });

          worker.on('message', (data) => resolve({ status: 'resolved', data }));
          worker.on('error', () => reject({ status: 'error', data: null }));
          worker.on('exit', (code) => {
            if (code !== 0)
              reject(new Error(`Worker stopped with exit code ${code}`));
          });
        });
      };
    
      const resultArray = [];

    for (let i = 0; i < numCPUs; i++) {
        const number = 10 + i;
        resultArray.push(funcWorker(number));
    }

    const resultPromise = await Promise.allSettled(resultArray);
    const resultWorker = resultPromise.map((valuePromise) => valuePromise.value);

    console.log(resultWorker);
};

await performCalculations();