import { User } from '../interfaces/interfaces';

export const checkForType = (body: User): boolean => {
    if (typeof body.name !== 'string' ||
        typeof body.age !== 'number' ||
        !Array.isArray(body.hobbies)) {
        return true;
    }
}