import { FastifyInstance } from 'fastify';

async function rootRoute(app: FastifyInstance) {
    function onGetExecute() {
        return { hello: 'world' };
    }

    app.get('/', onGetExecute);
}

export default rootRoute;