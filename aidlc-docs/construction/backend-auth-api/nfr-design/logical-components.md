# Backend Auth API Logical Components

## Included Components

### Config Validation Component

- **Purpose**: Validate environment variables at startup and expose typed config.
- **Inputs**: Process environment.
- **Outputs**: Typed database, auth, cookie, CORS, frontend URL, and SMTP config.
- **Failure Mode**: Backend startup fails when required values are missing or invalid.

### Global Validation Component

- **Purpose**: Validate request DTOs consistently.
- **Inputs**: HTTP request bodies, params, and query values.
- **Outputs**: Validated DTOs or validation error envelope.
- **Failure Mode**: Request is rejected before service logic.

### Error Envelope Component

- **Purpose**: Normalize errors returned to the frontend.
- **Inputs**: Validation errors, auth errors, token errors, email errors, unexpected errors.
- **Outputs**: Consistent JSON error response.
- **Failure Mode**: Unexpected errors return a safe generic error.

### Cookie Configuration Component

- **Purpose**: Centralize access and refresh cookie names, flags, and expiry behavior.
- **Inputs**: Typed cookie config and auth session output.
- **Outputs**: HTTP-only cookie write and clear options.
- **Failure Mode**: Invalid cookie configuration fails at startup.

### Email Delivery Component

- **Purpose**: Send SMTP email directly in auth request flows.
- **Inputs**: Verification, reset, or unknown-account notification message.
- **Outputs**: Successful send result or email-delivery failure.
- **Failure Mode**: SMTP failure aborts the API request.

### Structured Logging Component

- **Purpose**: Produce basic structured logs without sensitive data.
- **Inputs**: Startup events, SMTP failures, unexpected auth errors.
- **Outputs**: Structured application logs.
- **Failure Mode**: Logging failure must not change auth business behavior.

### Test Harness Component

- **Purpose**: Support unit and HTTP e2e tests.
- **Inputs**: Nest testing modules, fake SMTP transport, test database configuration.
- **Outputs**: Vitest and Supertest coverage for auth flows.
- **Failure Mode**: Tests fail when behavior deviates from functional or NFR design.

## Excluded Components For v1

### Durable Email Queue

- **Status**: Excluded.
- **Reason**: NFR requirements specify direct SMTP and no background retry worker.

### Cache

- **Status**: Excluded.
- **Reason**: Local/PoC scale has no cache requirement.

### Rate Limiter

- **Status**: Excluded.
- **Reason**: Basic security hardening was selected; rate limiting is out of scope for v1.

### Audit Log Store

- **Status**: Excluded.
- **Reason**: Full auth event audit logging was not selected for v1.

## Component Relationships

| Component | Used By | Notes |
|---|---|---|
| Config Validation Component | All backend modules | Prevents invalid runtime configuration. |
| Global Validation Component | HTTP controllers | Runs before controller/service logic. |
| Error Envelope Component | Controllers/global exception filter | Normalizes frontend-facing errors. |
| Cookie Configuration Component | AuthController/AuthService integration | Applies environment-aware cookie flags. |
| Email Delivery Component | AuthService | Fails request on SMTP failure. |
| Structured Logging Component | Bootstrap, EmailService, exception handling | Logs without secrets. |
| Test Harness Component | Backend test suite | Verifies service and HTTP behavior. |
