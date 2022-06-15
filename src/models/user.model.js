import { createRequire } from "module";
import { v4 } from 'uuid';
import { writeToData } from '../utils/index.js';


const require = createRequire(import.meta.url);
const users = require('../../data/users.json');

export const findAllUsers = () => {
    return new Promise((res, rej) => {
        res(users);
    });
};

export const findUserById = (id) => {
    return new Promise((res, rej) => {
        const user = users.find((el) => el.id === id);
        res(user);
    });
};

export const create = (user) => {
    return new Promise((res, rej) => {
        const newUser = { id: v4(), ...user };
        users.push(newUser);
        writeToData('./data/users.json', users);
        res(newUser);
    });
};


