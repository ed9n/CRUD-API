import { createRequire } from "module";

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
        res(user)
    });
}

