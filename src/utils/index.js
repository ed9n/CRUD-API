import { createWriteStream } from 'fs';


export const writeToData = async (puth, content) => {
    try {
        const writableStream = createWriteStream(puth, { flags: 'w' });
        writableStream.write(JSON.stringify(content));
    } catch (error) {
        console.log(error);
    };
};