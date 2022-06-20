import { createServer, IncomingMessage, ServerResponse } from 'http';
import { changeUser, createUser, getUser, getUsers, removeUser } from './controllers/user.controller';


export const server = createServer((req: IncomingMessage, res: ServerResponse) => {

    const id = req.url.split('/')[3];

    if (req.url === `/api/users` && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url === `/api/users/${id}` && req.method === 'GET') {
        getUser(req, res, id);
    } else if (req.url === `/api/users` && req.method === 'POST') {
        createUser(req, res);
    } else if (req.url === `/api/users/${id}` && req.method === 'PUT') {
        changeUser(req, res, id);
    } else if (req.url === `/api/users/${id}` && req.method === 'DELETE') {
        removeUser(req, res, id);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Root not found' }));
    };
});