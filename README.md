# AI-DLC Email Auth POC

Full-stack proof of concept for an email-based authentication flow built with Nuxt 3, NestJS, Prisma, PostgreSQL, and SMTP email delivery.

The project was generated through the AI-DLC workflow. Planning and implementation records live under `aidlc-docs/`.

## Project Structure

| Path | Purpose |
|---|---|
| `api/` | NestJS REST API for authentication, users, email delivery, Prisma, and configuration |
| `web/` | Nuxt 3 frontend for sign-up, verification, sign-in, recovery, and dashboard routes |
| `aidlc-docs/` | AI-DLC requirements, design, plans, code summaries, state, and audit trail |
| `.aidlc-rule-details/` | AI-DLC rule files used by the workflow |

## Features

- Email and password sign-up.
- Email verification flow.
- Sign-in with HTTP-only access and refresh cookies.
- Current-user lookup and protected dashboard.
- Sign-out with cookie clearing and refresh-token invalidation.
- Forgot-password and reset-password flow.
- PostgreSQL persistence through Prisma.
- SMTP-backed verification and password reset emails.
- Backend unit and e2e tests.
- Frontend component, composable, and API-client tests.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Nuxt 3, Vue 3, Tailwind CSS |
| Backend | NestJS, TypeScript |
| Database | PostgreSQL, Prisma |
| Auth | JWT access tokens, opaque refresh tokens, HTTP-only cookies |
| Email | Nodemailer with SMTP configuration |
| Tests | Vitest, Supertest, Vue Test Utils, Nuxt test utilities |

## Prerequisites

- Node.js compatible with the dependencies in `api/package.json` and `web/package.json`.
- pnpm 10.x, or npm if you prefer to install from `package.json`.
- Docker for local PostgreSQL.
- SMTP server or local SMTP test service for email delivery.

## Local Setup

Install backend dependencies:

```bash
cd api
pnpm install
cp .env.example .env
docker compose up -d
pnpm run prisma:generate
pnpm run prisma:migrate
pnpm run dev
```

In another terminal, install and run the frontend:

```bash
cd web
pnpm install
cp .env.example .env
pnpm run dev
```

Default local URLs:

- API: `http://localhost:4000`
- Web: Nuxt dev server URL from `pnpm run dev`, typically `http://localhost:3000`
- Database: PostgreSQL on `localhost:5432`

## Environment Files

Real environment files are intentionally ignored by Git:

- `api/.env`
- `web/.env`

Use the committed examples as templates:

- `api/.env.example`
- `web/.env.example`

The backend requires configuration for database URL, frontend origins, JWT secret, cookie settings, and SMTP. The frontend requires `NUXT_PUBLIC_API_BASE_URL`.

## API Endpoints

The backend exposes these auth endpoints:

- `POST /auth/signup`
- `POST /auth/verify-email`
- `POST /auth/signin`
- `POST /auth/refresh`
- `GET /auth/me`
- `POST /auth/signout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/protected`

## Frontend Routes

- `/auth/signup`
- `/auth/verify-email`
- `/auth/signin`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/dashboard`

## Test Commands

Backend:

```bash
cd api
pnpm test
pnpm run test:e2e
```

Frontend:

```bash
cd web
pnpm test
```

## Build Commands

Backend:

```bash
cd api
pnpm run build
```

Frontend:

```bash
cd web
pnpm run build
```

## Security Notes

- Auth cookies are HTTP-only so browser JavaScript does not directly read token values.
- Passwords are hashed before persistence.
- Verification and reset tokens are stored as hashes, not raw token strings.
- Forgot-password responses are generic to reduce account enumeration risk.
- `.gitignore` excludes real env files, key/certificate material, dependency folders, and generated build outputs.

## AI-DLC Documentation

Key workflow artifacts:

- `aidlc-docs/inception/requirements/requirements.md`
- `aidlc-docs/inception/application-design/application-design.md`
- `aidlc-docs/construction/backend-auth-api/code/code-generation-summary.md`
- `aidlc-docs/construction/frontend-auth-ui/code/code-generation-summary.md`
- `aidlc-docs/aidlc-state.md`
- `aidlc-docs/audit.md`
