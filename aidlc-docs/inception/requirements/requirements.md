# Requirements: Email Authentication Flow

## Intent Analysis

- **User Request**: Implement an email authentication flow using NuxtJS and NestJS.
- **Request Type**: New Project.
- **Scope Estimate**: Multiple components across frontend, backend, database, email delivery, and tests.
- **Complexity Estimate**: Moderate.
- **Project Type**: Greenfield.

## Functional Requirements

### Frontend

- Build a NuxtJS web application in a top-level `web` app.
- Provide user-facing auth pages for:
  - Sign up
  - Verify email
  - Sign in
  - Forgot password
  - Reset password
  - Protected dashboard
- Protect authenticated routes and redirect unauthenticated users to sign in.
- Read the authenticated user from the backend using cookie-based session credentials.
- Show clear success and error states for auth operations, including invalid credentials, duplicate email, expired tokens, invalid tokens, and unverified accounts.

### Backend

- Build a NestJS API in a top-level `api` app.
- Support email plus password authentication.
- Support sign up with email verification.
- Support sign in, sign out, refresh session, and current-user lookup.
- Support forgot-password and reset-password flow.
- Use HTTP-only cookies for browser sessions.
- Use JWT access tokens and refresh tokens.
- Store users and auth tokens in PostgreSQL through Prisma.
- Hash user passwords before persistence.
- Store verification and password reset tokens as hashed values, not raw token strings.
- Prevent sign in for accounts that require email verification but have not completed it.

### Email Delivery

- Use SMTP integration in the first version.
- Provide email-sending behavior for:
  - Email verification
  - Password reset
- Configure SMTP through environment variables.
- Keep email delivery behind a backend service interface so the implementation can be changed later without rewriting auth logic.

### Repository Structure

- Use two top-level applications:
  - `web` for NuxtJS.
  - `api` for NestJS.
- Keep application code in the workspace root, not inside `aidlc-docs/`.

## Non-Functional Requirements

- Use PostgreSQL with Prisma for persistence.
- Use HTTP-only cookies to avoid exposing auth tokens directly to browser JavaScript.
- Configure cookie security attributes for local development and production environments.
- Validate API input DTOs on the backend.
- Avoid leaking account existence details where practical, especially in recovery flows.
- Provide environment variable examples for database, JWT, cookie, CORS, frontend URL, and SMTP settings.
- Keep setup runnable locally with clear install, migration, and dev commands.

## Testing Requirements

- Add backend auth unit tests and e2e tests for critical auth behavior.
- Add basic Nuxt page/component tests for authentication pages and protected dashboard behavior.
- Cover at minimum:
  - Sign up creates an unverified user and sends verification email.
  - Email verification activates the account.
  - Sign in sets HTTP-only auth cookies for verified users.
  - Unverified users cannot sign in.
  - Forgot password triggers reset email behavior.
  - Reset password accepts valid token and rejects invalid or expired token.
  - Protected backend endpoint rejects unauthenticated requests.
  - Protected frontend route redirects unauthenticated users.

## Extension Decisions

- **Security Baseline Extension**: Disabled by requirements answer.
- **Property-Based Testing Extension**: Disabled by requirements answer.

## Out of Scope For First Implementation

- Magic-link-only passwordless sign in.
- Account email change flow.
- Social login.
- Multi-factor authentication.
- AWS SES-specific integration.
- Single deployable app where NestJS serves the Nuxt build.

## Open Assumptions

- NuxtJS means Nuxt 3.
- NestJS will expose a REST API.
- Prisma migrations will define the initial PostgreSQL schema.
- SMTP credentials will be provided by environment variables during runtime.
- Production deployment target is not yet selected and does not need infrastructure files in the first implementation.
