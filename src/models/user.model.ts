import { v4 } from 'uuid';
import { writeToData } from '../utils/index';
import users from '../../data/users.json';
import { User } from '../interfaces/interfaces';



export const findAllUsers = () => {
    return new Promise<User[]>((res, rej) => {
        res(users);
    });
};

export const findUserById = (id: string) => {
    return new Promise<User>((res, rej) => {
        const user = users.find((el) => el.id === id);
        res(user);
    });
};

export const create = (user: User) => {
    return new Promise<User>((res, rej) => {
        const newUser = { id: v4(), ...user };
        users.push(newUser);
        writeToData('./data/users.json', users);
        res(newUser);
    });
};

export const change = (oldUser: User, newUser: User) => {
    return new Promise<User>((res, rej) => {
        const changedUser = newUser;
        const user = oldUser;

        user.name = changedUser.name;
        user.age = changedUser.age;
        user.hobbies = changedUser.hobbies;

        writeToData('./data/users.json', users)

        res(user);
    });
};


