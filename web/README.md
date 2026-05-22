# Frontend Auth UI

Nuxt 3 frontend for the AI-DLC email authentication flow.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The app expects the backend API to be available at `NUXT_PUBLIC_API_BASE_URL`.

## Routes

- `/auth/signup`
- `/auth/verify-email`
- `/auth/signin`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/dashboard`

## Tests

```bash
npm test
```
