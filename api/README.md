# Backend Auth API

NestJS REST API for the AI-DLC email authentication flow.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL:

```bash
docker compose up -d
```

4. Generate Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Start the API:

```bash
npm run dev
```

## Tests

```bash
npm test
npm run test:e2e
```

## Auth Endpoints

- `POST /auth/signup`
- `POST /auth/verify-email`
- `POST /auth/signin`
- `POST /auth/refresh`
- `GET /auth/me`
- `POST /auth/signout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/protected`
