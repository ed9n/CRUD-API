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