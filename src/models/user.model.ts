import { v4 } from 'uuid';
import { writeToData } from '../utils/index';
import users from '../../data/users.json';
import { User } from '../interfaces/interfaces';



export const findAllUsers = () => {
    return new Promise((res, rej) => {
        res(users);
    });
};

export const findUserById = (id: string) => {
    return new Promise((res, rej) => {
        const user = users.find((el) => el.id === id);
        res(user);
    });
};

export const create = (user: User) => {
    return new Promise((res, rej) => {
        const newUser = { id: v4(), ...user };
        users.push(newUser);
        writeToData('./data/users.json', users);
        res(newUser);
    });
};


