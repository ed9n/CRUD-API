import { create, findAllUsers, findUserById } from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (req, res, id) => {
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

export const createUser = async (req, res) => {
    try {
        let body;

        req.on('data', (chunk) => {
            body = chunk.toString();
        });

        req.on('end', async () => {

            const { name, age, hobbies } = JSON.parse(body);
            const user = {
                name,
                age,
                hobbies
            };

            const newUser = await create(user);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });

    } catch (error) {
        console.log(error);
    };
};