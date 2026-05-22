# Backend Auth API NFR Design Patterns

## SMTP Failure Pattern

- Send verification and password reset emails directly inside the API request flow.
- If SMTP sending fails, abort the API request.
- Return a consistent email-delivery error envelope to the frontend.
- Do not claim that verification or reset email delivery succeeded when SMTP fails.
- Do not introduce background queues or durable retry workers in v1.

## Cookie Security Pattern

- Use centralized cookie configuration.
- Local development may use non-secure cookies for `localhost`.
- Production-like configuration must support secure cookies.
- When frontend and backend are cross-site in production-like settings, use `SameSite=None` with `Secure=true`.
- Cookies must be HTTP-only for access and refresh tokens.
- Frontend must use credentialed requests.

## Validation Pattern

- Use a global validation pipe for DTO validation.
- Reject malformed inputs before service-layer business logic executes.
- Keep validation errors machine-readable for frontend field display.
- Apply DTO validation consistently across sign-up, verify email, sign-in, refresh, forgot password, reset password, and sign-out where request bodies exist.

## Error Envelope Pattern

- Return a consistent JSON error envelope for validation, authentication, token, and email-delivery failures.
- Include a stable error code suitable for frontend branching.
- Include a user-safe message.
- Include field-level validation details when applicable.
- Do not include password hashes, token hashes, raw token values, stack traces, or SMTP credentials.

Example shape:

```json
{
  "error": {
    "code": "EMAIL_DELIVERY_FAILED",
    "message": "We could not send the email. Please try again.",
    "fields": []
  }
}
```

## Configuration Validation Pattern

- Validate environment configuration at backend startup.
- Use a typed schema for:
  - Database URL
  - JWT access secret
  - JWT access expiry
  - Refresh token expiry
  - Verification token expiry
  - Reset token expiry
  - Cookie names and security mode
  - CORS frontend origin
  - Frontend URL for email links
  - SMTP host, port, credentials, sender, and security settings
- Fail startup if required configuration is missing or invalid.

## Logging Pattern

- Emit basic structured application logs for:
  - Application startup and configuration mode, without secrets.
  - SMTP send failures.
  - Unexpected auth errors.
- Do not implement full auth event audit logging in v1.
- Do not log raw tokens, token hashes, passwords, password hashes, or SMTP credentials.

## Testing Pattern

- Use Vitest for service and module tests.
- Use Supertest for HTTP e2e tests.
- Mock or fake SMTP transport in tests.
- Include explicit tests for SMTP failure causing sign-up/password-reset request failure.
- Include tests for error envelope shape and validation failures.

## Scalability Pattern

- Keep direct services and database persistence.
- Avoid queue, cache, and rate-limiter components in v1.
- Keep module boundaries clear so future scaling patterns can be introduced later.
