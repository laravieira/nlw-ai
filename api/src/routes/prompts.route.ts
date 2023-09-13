import { FastifyInstance } from 'fastify';
import prisma from '../lib/prisma';

async function promptsRoute(app: FastifyInstance) {
    async function onGetExecute() {
        return await prisma.prompt.findMany();
    }

    app.get('/prompts', onGetExecute);
}

export default promptsRoute;