import { v4 } from 'uuid';
import { User } from '../interfaces/interfaces';
import { users } from '../../data/users';

export const findAllUsers = () => {
    return new Promise<Array<User>>((res, rej) => {
        res(users);
    });
};

export const findUserById = (id: string) => {
    return new Promise<User>((res, rej) => {
        const user: User = users.find((el) => el.id === id);

        res(user);
    });
};

export const create = (user: User) => {
    return new Promise<User>((res, rej) => {
        const newUser = { id: v4(), ...user };
        users.push(newUser);

        res(newUser);
    });
};

export const change = (oldUser: User, newUser: User) => {
    return new Promise<User>((res, rej) => {
        const changedUser: User = newUser;
        const user: User = oldUser;

        user.name = changedUser.name;
        user.age = changedUser.age;
        user.hobbies = changedUser.hobbies;

        res(user);
    });
};

export const remove = (user: User) => {
    return new Promise<Array<User>>((res, rej) => {
        const index = users.indexOf(user)
        if (index !== -1) {
            users.splice(index, 1);
        }
        res(users)
    });
};


