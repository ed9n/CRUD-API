import { createServer } from 'http';
import dotenv from 'dotenv';
import { getUser, getUsers } from './controllers/user.controller.js';


const server = createServer((req, res) => {
    const id = req.url.split('/')[3];

    if (req.url === `/api/users` && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url === `/api/users/${id}` && req.method === 'GET') {
        getUser(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Root not found' }));
    }
});

dotenv.config();
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

