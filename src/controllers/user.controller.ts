import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../interfaces/interfaces';
import { change, create, findAllUsers, findUserById, remove } from '../models/user.model';
import { checkForType } from '../utils';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
    try {

        const users = await findAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));

    } catch (error) {

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Something went to wrong with users' }));
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
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));

        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Something went to wrong with user' }));
    }
}


export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        let body: string;

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

                const parsedUser: User = JSON.parse(body);

                const keysUser = Object.keys(user);
                const strKeysUser = keysUser.toString();

                const keysNewUser = Object.keys(parsedUser);
                const strKeysNewUser = keysNewUser.toString();

                const chekType = checkForType(parsedUser)

                if (strKeysUser !== strKeysNewUser) {

                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'body does not contain required fields' }));
                    return;

                } else if (chekType) {

                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Invalid data in request' }));
                    return;
                }

                const newUser: User = await create(user);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newUser));

            } catch (error) {
                console.log(error)
            };
        });
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Something went to wrong with create User' }));
    };
};

export const changeUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {

        const oldUser = await findUserById(id);
        let body: string;

        if (!oldUser) {
            if (req.url === '/api/users/' && req.method === 'PUT') {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid data in request' }));
            }
        } else {
            req.on("data", (chunk) => {
                body = chunk.toString()
            })
            req.on("end", async () => {
                try {

                    const userFromBody: User = JSON.parse(body);
                    const checkType = checkForType(userFromBody);

                    if (checkType) {

                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Invalid data in request' }));
                        return;

                    }

                    const changedUser = await change(oldUser, userFromBody);

                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(changedUser));

                } catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'пиззда' }));
                };
            });
        };
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Something went to wrong with change User' }));
    };
};


export const removeUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {

        const user: User = await findUserById(id);

        if (!user) {

            if (req.url === '/api/users/' && req.method === 'DELETE') {

                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            } else {

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid data in request' }));
            }

        } else {
            await remove(user);
            res.statusCode = 204;
            res.end();
        };

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Something went to wrong with remove User' }));
    };
};