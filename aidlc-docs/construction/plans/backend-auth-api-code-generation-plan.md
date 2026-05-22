# Backend Auth API Code Generation Plan

This plan is the single source of truth for Backend Auth API code generation. Application code must be generated under `api/`, never under `aidlc-docs/`.

## Unit Context

- **Unit**: Backend Auth API
- **Code Location**: `api/`
- **Workspace Root**: `/Users/adi/Documents/AI-DLC POC`
- **Project Type**: Greenfield multi-unit workspace
- **Stories Implemented**: US-001 through US-008 backend responsibilities
- **Dependencies**:
  - PostgreSQL via Docker Compose
  - Prisma schema and migrations
  - SMTP configuration
  - Nuxt frontend will consume REST contracts in a later unit

## Story Traceability

- [x] US-001 Create Account: backend sign-up, unverified user creation, verification email
- [x] US-002 Verify Email Address: verification token validation and email verification
- [x] US-003 Block Unverified Sign-In: unverified account sign-in rejection
- [x] US-004 Sign In: credentials, cookies, current user, refresh
- [x] US-005 Access Protected Dashboard: protected backend endpoint and guard
- [x] US-006 Request Password Reset: generic response and reset/notification emails
- [x] US-007 Reset Password: reset token validation, password update, refresh token clearing
- [x] US-008 Sign Out: cookie clearing and refresh token clearing

## Generation Steps

- [x] Step 1: Project Structure Setup
  - Create `api/package.json`, `api/tsconfig.json`, `api/tsconfig.build.json`, `api/nest-cli.json`, `api/vitest.config.ts`, `api/docker-compose.yml`, `api/.env.example`, `api/README.md`.
  - Create source directories under `api/src/` for auth, users, email, prisma, config, common errors, and testing support.

- [x] Step 2: Database and Prisma Layer Generation
  - Create `api/prisma/schema.prisma`.
  - Model `User`, `EmailVerificationToken`, and `PasswordResetToken`.
  - Include one active refresh token hash and expiry on `User`.
  - Create `api/src/prisma/prisma.module.ts` and `api/src/prisma/prisma.service.ts`.

- [x] Step 3: Configuration and Bootstrap Generation
  - Create `api/src/main.ts`, `api/src/app.module.ts`, and backend config module files.
  - Implement startup configuration validation for database, JWT, cookies, CORS, frontend URL, and SMTP.
  - Configure global validation pipe and consistent error envelope handling.

- [x] Step 4: Common Error and Response Infrastructure
  - Create common API error classes, error codes, and exception filter under `api/src/common/`.
  - Support validation, auth, token, and email-delivery error envelopes.

- [x] Step 5: Users and Domain Persistence Generation
  - Create `api/src/users/users.module.ts`, `api/src/users/users.service.ts`, and user-facing types.
  - Implement normalized email lookup, user creation, verification token storage/consume, password reset token storage/consume, password update, and refresh token hash operations.

- [x] Step 6: Auth Business Logic Generation
  - Create `api/src/auth/auth.module.ts`, DTOs, services, token/password helpers, guards, decorators, and controller.
  - Implement sign-up, verify email, sign-in, refresh, current user, sign-out, forgot password, and reset password.
  - Implement selected business rules: strong password policy, unverified duplicate sign-up resend/replace, one active refresh session, single-use tokens, unknown-email notification, and clear refresh token after reset.

- [x] Step 7: Email Service Generation
  - Create `api/src/email/email.module.ts`, `api/src/email/email.service.ts`, and template helpers.
  - Implement SMTP transport with HTML plus plain text verification, reset, and unknown-account notification emails.
  - Ensure SMTP send failure aborts request flow with email-delivery error.

- [x] Step 8: Backend Test Generation
  - Create Vitest setup and tests under `api/test/` or colocated `*.spec.ts` files.
  - Cover sign-up, verification, unverified sign-in block, sign-in cookies/current user, forgot password, reset password, sign-out, protected endpoint rejection, validation errors, and SMTP failure.
  - Use Supertest for HTTP e2e coverage.

- [x] Step 9: Backend Documentation Summary
  - Update `api/README.md` with local setup, Docker Compose PostgreSQL, Prisma commands, environment variables, and test commands.
  - Create `aidlc-docs/construction/backend-auth-api/code/code-generation-summary.md` summarizing generated backend code and story coverage.

- [x] Step 10: Final Generation Review
  - Verify no application code was written under `aidlc-docs/`.
  - Verify all planned files exist.
  - Mark all backend story traceability checkboxes complete after implementation.
  - Leave Build and Test execution for the AI-DLC Build and Test stage.

## Expected Interfaces

- `POST /auth/signup`
- `POST /auth/verify-email`
- `POST /auth/signin`
- `POST /auth/refresh`
- `GET /auth/me`
- `POST /auth/signout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- Protected test endpoint for backend guard/e2e verification if needed.

## Database Entities Owned

- `User`
- `EmailVerificationToken`
- `PasswordResetToken`

## Completion Criteria

- Backend code exists under `api/`.
- Prisma schema exists under `api/prisma/schema.prisma`.
- Backend tests are generated.
- Backend setup docs and `.env.example` are generated.
- Code generation summary exists under `aidlc-docs/construction/backend-auth-api/code/`.
- All plan checkboxes and story traceability boxes are marked complete after generation.
