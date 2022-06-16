import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../interfaces/interfaces';
import { create, findAllUsers, findUserById } from '../models/user.model';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const users = await findAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {
        const user = await findUserById(id);
        if (!user) {
            if (req.url === '/api/users/' && req.method === 'GET') {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid data in request' }));
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        }
    } catch (error) {
        console.log(error);
    }
}


export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        let body = '';

        req.on('data', (chunk) => {
            body = chunk.toString();
        });

        req.on('end', async () => {
            try {
                const { name, age, hobbies } = JSON.parse(body);

                const user: User = {
                    name,
                    age,
                    hobbies
                };

                const newUser: User = JSON.parse(body);

                const keysUser = Object.keys(user);
                const strKeysUser = keysUser.toString();

                const keysNewUser = Object.keys(newUser);
                const strKeysNewUser = keysNewUser.toString();

                if (strKeysUser === strKeysNewUser) {

                    const newUser = await create(user);

                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newUser));
                } else {

                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'body does not contain required fields' }));
                }
            } catch (error) {

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'body does not contain required fields' }));

            }
        });

    } catch (error) {
        console.log(error);
    };
};