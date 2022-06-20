import cluster from 'cluster';
import { cpus } from 'os';
import { server } from '../src/app';
import dotenv from 'dotenv';
import { users } from '../data/users';

const pid = process.pid;

if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master started. Pid: ${pid}`);
    for (let i = 0; i < cpusCount - 1; i++) {
        let worker = cluster.fork();
        worker.send(users);
    }

    cluster.on('exit', (worker) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
}

if (cluster.isWorker) {

    dotenv.config();
    const PORT = process.env.PORT;
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}. Worker: ${pid}`));

};



