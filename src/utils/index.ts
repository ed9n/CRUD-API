import { createWriteStream } from 'fs';


export const writeToData = async (puth: any, content: any) => {
    try {
        const writableStream = createWriteStream(puth, { flags: 'w' });
        writableStream.write(JSON.stringify(content));
    } catch (error) {
        console.log(error);
    };
};