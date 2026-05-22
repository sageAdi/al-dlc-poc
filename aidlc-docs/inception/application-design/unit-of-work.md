# Units of Work

## Code Organization Strategy

- Application code lives at the workspace root.
- Backend application code goes under `api/`.
- Frontend application code goes under `web/`.
- AI-DLC documentation remains under `aidlc-docs/`.
- Each application owns its own setup documentation and environment example.

## Unit 1: Backend Auth API

- **Code Location**: `api/`
- **Development Order**: 1
- **Purpose**: Build the NestJS REST API, auth lifecycle, Prisma/PostgreSQL schema, SMTP email delivery, cookie/session behavior, and backend tests.
- **Responsibilities**:
  - Create NestJS project structure.
  - Implement Auth, Users, Email, Prisma, and Config modules.
  - Define Prisma schema and migrations for users and auth tokens.
  - Implement email/password sign up, verification, sign in, refresh, current user, sign out, forgot password, and reset password endpoints.
  - Configure HTTP-only access and refresh cookies.
  - Implement SMTP email service with HTML plus plain text templates.
  - Add backend unit and e2e tests for auth behavior.
  - Add backend environment example and API setup notes.
- **Completion Criteria**:
  - Backend compiles.
  - Prisma schema is present.
  - Auth endpoints are implemented.
  - Backend tests cover required auth flows.

## Unit 2: Frontend Auth UI

- **Code Location**: `web/`
- **Development Order**: 2
- **Purpose**: Build Nuxt 3 auth pages, forms, auth composable, route middleware, typed REST client, protected dashboard, and frontend tests.
- **Responsibilities**:
  - Create Nuxt 3 project structure.
  - Implement page-first auth pages.
  - Implement reusable auth form components.
  - Implement typed auth API client functions.
  - Implement `useAuth()` with Nuxt `useState`, initialized from `/auth/me`.
  - Implement route middleware for protected dashboard access.
  - Add basic Nuxt page/component tests.
  - Add frontend environment example and web setup notes.
- **Completion Criteria**:
  - Frontend compiles.
  - Auth pages and protected dashboard exist.
  - Frontend auth client sends credentials for cookie-based requests.
  - Nuxt tests cover core auth UI behavior.

## Unit 3: Integration, Testing, and Setup Verification

- **Code Location**: Cross-app, using `api/` and `web/`
- **Development Order**: 3
- **Purpose**: Verify the backend and frontend work together and confirm local setup behavior.
- **Responsibilities**:
  - Verify API contract compatibility between `web` and `api`.
  - Verify cookie-based auth works across Nuxt and NestJS origins.
  - Run backend and frontend tests.
  - Check local setup instructions in each app.
  - Confirm environment examples cover required settings.
- **Completion Criteria**:
  - Backend and frontend tests run.
  - Cross-app auth flows are manually or automatically verified.
  - Setup documentation is sufficient to run both apps locally.
