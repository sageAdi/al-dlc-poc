# Backend Auth API Tech Stack Decisions

## Runtime and Framework

- **Backend Framework**: NestJS.
- **Language**: TypeScript.
- **API Style**: REST.
- **Reasoning**: Required by approved requirements and application design.

## Database

- **Database**: PostgreSQL.
- **ORM**: Prisma.
- **Local Runtime**: Docker Compose for PostgreSQL.
- **Migration Strategy**: Prisma migrations.
- **Reasoning**: Required by requirements; Docker Compose provides repeatable local setup.

## Authentication and Sessions

- **Access Token**: JWT in HTTP-only cookie.
- **Refresh Token**: Opaque token in HTTP-only cookie, stored as one active hash on the user record.
- **Token Defaults**:
  - Access token: 15 minutes.
  - Refresh token: 7 days.
  - Verification/reset tokens: 1 hour.
- **Reasoning**: Matches functional design and v1 local/PoC scale.

## Passwords and Tokens

- **Password Storage**: Hashed passwords only.
- **Token Storage**: Hashed verification, reset, and refresh tokens only.
- **Password Policy**: Minimum 10 characters with uppercase, lowercase, number, and symbol.
- **Reasoning**: Matches functional design and basic security hardening requirement.

## Email

- **Provider Type**: SMTP.
- **Email Templates**: HTML plus plain text templates generated in Email module.
- **Failure Behavior**: Fail the API request if SMTP send fails for sign-up or password reset email delivery.
- **Reasoning**: v1 requires direct SMTP behavior without background queues.

## Validation and Configuration

- **Validation**: DTO validation for backend requests.
- **Configuration**: Central Config module for database, JWT, cookies, CORS, frontend URL, and SMTP.
- **CORS**: Credentialed requests from the Nuxt frontend origin.
- **Reasoning**: Supports safe cookie-based Nuxt/Nest integration.

## Testing

- **Unit/Integration Test Runner**: Vitest.
- **Nest Testing Utilities**: Nest testing module utilities.
- **HTTP E2E Testing**: Supertest.
- **Reasoning**: User-selected backend testing stack; supports service-level and HTTP endpoint tests.

## Explicitly Out of Scope For v1

- Rate limiting.
- Audit logging.
- Account lockout rules.
- Background email queue and retry workers.
- Explicit throughput or p95 latency SLOs.
- Multi-device refresh-session tracking.
