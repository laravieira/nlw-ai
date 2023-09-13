import 'dotenv/config';
import { fastify } from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';
import rootRoute from './routes/root.route';
import promptsRoute from './routes/prompts.route';
import videoRoute from './routes/video.route';
import transcriptRoute from './routes/transcript.route';
import subjectRoute from './routes/subject.route';

const app = fastify();

app.register(fastifyMultipart, {
    limits: {
        fileSize: 1048576*80 // 80MB
    }
});

app.register(fastifyCors, {
    origin: '*',
});

app.register(rootRoute);
app.register(videoRoute);
app.register(transcriptRoute);
app.register(subjectRoute);
app.register(promptsRoute);

app.listen({ port: 3333 }).then(() => console.log('Server is running on port 3333'));