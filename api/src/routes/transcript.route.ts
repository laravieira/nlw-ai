import { FastifyInstance, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma';
import { z as zod } from 'zod';
import { createReadStream } from 'fs';
import openai from '../lib/openai';

async function transcriptRoute(app: FastifyInstance) {
    async function onPostExecute(request: FastifyRequest) {
        const paramsSchema = zod.object({
            video: zod.string().uuid()
        });
        const bodySchema = zod.object({
            prompt: zod.string()
        });
        const { video: id } = paramsSchema.parse(request.params);
        const { prompt } = bodySchema.parse(request.body);

        const { path } = await prisma.video.findUniqueOrThrow({
            where: { id }
        });

        const audioReadStream = createReadStream(path);

        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: .6,
            prompt
        });

        await prisma.video.update({
            where: { id },
            data: {
                transcript: response.text
            }
        });

        return response.text;
    }

    app.post('/transcription/:video', onPostExecute);
}

export default transcriptRoute;