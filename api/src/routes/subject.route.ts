import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../lib/prisma';
import { z as zod } from 'zod';
import openai from '../lib/openai';

async function subjectRoute(app: FastifyInstance) {
    async function onPostExecute(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = zod.object({
            video: zod.string().uuid(),
            template: zod.string(),
            temperature: zod.number().min(0).max(1).default(.6),
        });
        const { video, template, temperature } = bodySchema.parse(request.body);

        const { transcript } = await prisma.video.findUniqueOrThrow({
            where: { id: video }
        });

        if(!transcript)
            return reply.status(400).send({ message: 'Transcript not generated yet.' });

        const prompt = template.replace('{transcript}', transcript);

        return openai.chat.completions.create({
            model: 'gpt-3.5-turbo-16k',
            temperature,
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        });
    }

    app.post('/subject', onPostExecute);
}

export default subjectRoute;