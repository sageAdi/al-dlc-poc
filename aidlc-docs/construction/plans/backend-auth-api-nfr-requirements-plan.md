# Backend Auth API NFR Requirements Plan

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match your needs, choose `X` and describe your preference after the tag.

## Unit Context

- **Unit**: Backend Auth API
- **Code Location**: `api/`
- **Functional Scope**: Account creation, verification, sign-in, refresh, current user, sign-out, forgot password, reset password, SMTP email delivery, Prisma/PostgreSQL persistence, and backend tests.

## Planning Checklist

- [x] Confirm expected backend usage/load target.
- [x] Confirm API response time targets.
- [x] Confirm token expiry and session duration defaults.
- [x] Confirm availability/reliability expectations for SMTP failures.
- [x] Confirm security hardening expectations.
- [x] Confirm backend test technology choices.
- [x] Generate `aidlc-docs/construction/backend-auth-api/nfr-requirements/nfr-requirements.md`.
- [x] Generate `aidlc-docs/construction/backend-auth-api/nfr-requirements/tech-stack-decisions.md`.
- [x] Validate Backend Auth API NFR completeness and consistency.

## Question 1
What initial traffic/load target should the Backend Auth API be designed for?

A) Local/PoC scale: correctness first, no explicit throughput target
B) Small production scale: hundreds of users, normal auth traffic, simple horizontal scaling later
C) Larger production scale: thousands of users, explicit rate limiting and scaling considerations now
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
What API response time target should be used for normal auth requests, excluding SMTP delivery time?

A) Best-effort local development target only
B) 95th percentile under 500 ms for normal non-email auth API work
C) 95th percentile under 200 ms for normal non-email auth API work
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
What default token/session duration should v1 use?

A) Access token 15 minutes, refresh token 7 days, verification/reset tokens 1 hour
B) Access token 30 minutes, refresh token 30 days, verification/reset tokens 24 hours
C) Access token 5 minutes, refresh token 1 day, verification/reset tokens 15 minutes
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
How should the backend behave if SMTP email sending fails during sign-up or password reset?

A) Fail the API request and do not claim the email was sent
B) Complete the API request and log the SMTP failure for retry/manual investigation
C) Store an email job for retry through a background queue
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
What security hardening should be required in v1?

A) Basic: DTO validation, password hashing, HTTP-only cookies, CORS credentials, token hashing
B) Standard: Basic plus rate limiting on auth endpoints and generic credential/recovery responses
C) Strict: Standard plus audit logging for auth events and explicit account lockout rules
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
Which backend testing stack should be used?

A) Jest with Nest testing utilities and Supertest for e2e
B) Vitest with Nest testing utilities and Supertest for e2e
C) Minimal Jest unit tests only
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 7
What local database/runtime setup should be documented for the backend?

A) PostgreSQL via Docker Compose, Prisma migrations, and local Nest dev server
B) Developer-provided PostgreSQL URL only, no Docker Compose
C) SQLite fallback for local development with PostgreSQL for production
X) Other (please describe after [Answer]: tag below)

[Answer]: A
