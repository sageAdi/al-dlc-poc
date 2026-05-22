# Backend Auth API NFR Design Plan

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match your needs, choose `X` and describe your preference after the tag.

## Unit Context

- **Unit**: Backend Auth API
- **NFR Baseline**: Local/PoC scale, best-effort performance, direct SMTP with fail-on-error, basic hardening, Vitest/Supertest, Docker Compose PostgreSQL.

## Planning Checklist

- [x] Confirm SMTP failure implementation pattern.
- [x] Confirm cookie security defaults for local and production-like environments.
- [x] Confirm validation and error response pattern.
- [x] Confirm configuration validation pattern.
- [x] Confirm logging pattern.
- [x] Confirm logical components to include/exclude.
- [x] Generate `aidlc-docs/construction/backend-auth-api/nfr-design/nfr-design-patterns.md`.
- [x] Generate `aidlc-docs/construction/backend-auth-api/nfr-design/logical-components.md`.
- [x] Validate Backend Auth API NFR design completeness and consistency.

## Question 1
How should SMTP failure be handled in the backend design?

A) Direct send inside request flow; if SMTP send fails, abort the request and return an email-delivery error
B) Direct send inside request flow; if SMTP send fails, log error but return generic success
C) Abstract email jobs behind an in-memory queue, but still no durable retry worker
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
How should cookie security defaults be designed for local development and production-like configuration?

A) Environment-aware cookie config: local allows non-secure cookies, production-like requires secure SameSite=None when cross-site
B) Always secure cookies only, even locally
C) Always local-friendly cookies with no production distinction
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
How should API validation and error response formatting be designed?

A) Global validation pipe plus consistent JSON error envelope for validation, auth, token, and email failures
B) Use Nest default validation/error responses with no custom envelope
C) Custom error envelope only for auth endpoints, defaults elsewhere
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
How should backend environment configuration be validated?

A) Validate at startup with a typed schema for database, JWT, cookie, CORS, frontend URL, and SMTP settings
B) Read environment variables directly where needed and fail at runtime if missing
C) Validate only database and JWT settings at startup
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
What logging pattern should v1 use?

A) Basic structured application logs for startup, SMTP failures, and unexpected auth errors, without audit logging
B) Full auth event audit logging for sign-up, sign-in, reset, and sign-out
C) Console logs only during local development and no structured pattern
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
Which optional logical components should be included in v1?

A) No queue/cache/rate-limiter components; keep direct services only
B) Add rate-limiter logical component even though rate limiting was not required
C) Add email queue logical component even though durable retries were not required
X) Other (please describe after [Answer]: tag below)

[Answer]: A
