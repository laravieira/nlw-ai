# NLW AI - Upload AI

Aplicação que possibilita realizar upload de videos e por meio de IA, criar automaticamente títulos chamativos e descrições com um boa indexação.

![Frontend](/assets/frontend-screenshot.jpeg)

## How to run locally
Set your .env file at `/api/.env`.
```properties
DATABASE_URL="file:./dev.db"
OPENAI_KEY="replace-with-your-openai-key"
```
Then run the following commands:
```bash
pnpm install
pnpm run dev
```