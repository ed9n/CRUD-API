import { createWriteStream } from 'fs';
import { User } from '../interfaces/interfaces';


export const writeToData = async (puth: string, content: User[]) => {
    try {
        const writableStream = createWriteStream(puth, { flags: 'w' });
        writableStream.write(JSON.stringify(content));
    } catch (error) {
        console.log(error);
    };
};


export const checkForType = (body: User): boolean => {
    if (typeof body.name !== 'string' ||
        typeof body.age !== 'number' ||
        !Array.isArray(body.hobbies)) {
        return true;
    }
}