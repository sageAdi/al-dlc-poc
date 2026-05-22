# Backend Auth API NFR Requirements

## Scope

This document defines non-functional requirements for Unit 1: Backend Auth API.

## Scalability

- Target local/PoC scale for v1.
- Prioritize correctness and clear local operation over explicit throughput targets.
- Design should not prevent later horizontal scaling, but no scaling infrastructure is required in v1.
- The single-refresh-token-per-user model is acceptable for v1 and does not need multi-device session scaling.

## Performance

- Use best-effort local development performance targets only.
- No explicit p95 response-time SLO is required for v1.
- Normal auth operations should avoid unnecessary database round trips where practical.
- SMTP delivery time is part of the request path because SMTP failures must fail the API request in v1.

## Availability and Reliability

- Backend must fail sign-up and password reset requests when SMTP sending fails.
- The API must not claim verification or reset email delivery succeeded if SMTP delivery fails.
- Email job queues and retry workers are out of scope for v1.
- PostgreSQL is required for local operation through Docker Compose.
- Prisma migrations must be documented for local database setup.

## Security

- Validate request DTOs before business logic execution.
- Hash passwords before storing them.
- Store token hashes rather than raw verification, reset, or refresh tokens.
- Use HTTP-only cookies for access and refresh tokens.
- Configure CORS to allow credentialed requests from the Nuxt frontend origin.
- Use generic credential failure responses where required by functional design.
- Use generic forgot-password response behavior while sending a generic notification email for unknown submitted addresses.
- Rate limiting, audit logging, and explicit account lockout are not required in v1.

## Session and Token Defaults

- Access token default lifetime: 15 minutes.
- Refresh token default lifetime: 7 days.
- Email verification token default lifetime: 1 hour.
- Password reset token default lifetime: 1 hour.
- Successful sign-in replaces the stored refresh token hash.
- Successful password reset clears the stored refresh token hash.

## Maintainability

- Keep modules separated as Auth, Users, Email, Prisma, and Config.
- Keep SMTP behavior behind EmailService.
- Keep environment parsing centralized in Config module.
- Backend setup documentation must cover PostgreSQL Docker Compose, Prisma migrations, and local Nest dev server.

## Testability

- Use Vitest with Nest testing utilities.
- Use Supertest for backend e2e HTTP tests.
- Tests must cover the auth business flows defined in functional design.
- Backend tests should mock or isolate SMTP behavior where appropriate while preserving failure behavior coverage.

## Usability

- Backend responses should support clear frontend states for duplicate verified sign-up, verification-required sign-in, invalid/expired tokens, validation errors, and email-send failures.
- Public user responses must not expose sensitive fields.
