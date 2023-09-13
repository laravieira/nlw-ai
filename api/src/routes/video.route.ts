import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';

async function videoRoute(app: FastifyInstance) {
    async function onGetExecute() {
        return await prisma.video.findMany();
    }

    async function onPostExecute(request: FastifyRequest, reply: FastifyReply) {
        const data = await request.file();

        if(!data)
            return reply.status(400).send({ message: 'No file uploaded' });

        const { filename } = data;

        const extension = path.extname(filename);
        if(extension !== '.mp3')
            return reply.status(400).send({ message: 'Invalid file type', accepted: '.mp3' });

        const baseName = path.basename(filename, extension);
        const uploadName = `${baseName}-${randomUUID()}${extension}`;
        const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', uploadName);

        await promisify(pipeline)(data.file, fs.createWriteStream(uploadPath));

        return await prisma.video.create({
            data: {
                title: baseName,
                path: uploadPath
            }
        });
    }

    app.get('/video', onGetExecute);
    app.post('/video', onPostExecute);
}

export default videoRoute;