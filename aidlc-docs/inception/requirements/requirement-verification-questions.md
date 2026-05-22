# Requirements Verification Questions

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match your needs, choose `X` and describe your preference after the tag.

## Question 1
What should "email auth flow" mean for the first implementation?

A) Email plus password sign up/sign in, with email verification
B) Passwordless magic-link sign in only
C) Email plus password sign up/sign in, without email verification
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
Which account recovery features should be included?

A) Include forgot-password and reset-password flow
B) Include only sign up, sign in, sign out, and current-user session
C) Include account recovery plus email change flow
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
How should browser sessions be managed?

A) HTTP-only secure cookies with JWT access and refresh tokens
B) HTTP-only secure cookies with server-side sessions stored in the database
C) Bearer JWT tokens returned to the Nuxt client
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
Which database should the NestJS backend use?

A) PostgreSQL with Prisma
B) SQLite with Prisma for local development
C) PostgreSQL with TypeORM
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
How should emails be delivered in the first version?

A) Console/log transport for local development, with provider interface for later SendGrid/SES
B) AWS SES integration from day one
C) SMTP integration from day one
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 6
What Nuxt UI scope should be implemented?

A) Full auth pages: sign up, verify email, sign in, forgot password, reset password, and protected dashboard
B) Minimal pages: sign up, sign in, sign out, and protected dashboard
C) API-only backend with no Nuxt UI yet
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 7
What repository shape should be used?

A) Monorepo with `apps/web` for Nuxt and `apps/api` for NestJS
B) Two top-level apps: `web` and `api`
C) NestJS serves the Nuxt build as one deployable app
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 8
What test coverage should be required for the first implementation?

A) Backend unit/e2e tests for auth plus basic Nuxt page/component tests
B) Backend auth tests only
C) Minimal smoke tests only
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 9: Security Extensions
Should security extension rules be enforced for this project?

A) Yes - enforce all SECURITY rules as blocking constraints (recommended for production-grade applications)
B) No - skip all SECURITY rules (suitable for PoCs, prototypes, and experimental projects)
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 10: Property-Based Testing Extension
Should property-based testing (PBT) rules be enforced for this project?

A) Yes - enforce all PBT rules as blocking constraints (recommended for projects with business logic, data transformations, serialization, or stateful components)
B) Partial - enforce PBT rules only for pure functions and serialization round-trips (suitable for projects with limited algorithmic complexity)
C) No - skip all PBT rules (suitable for simple CRUD applications, UI-only projects, or thin integration layers with no significant business logic)
X) Other (please describe after [Answer]: tag below)

[Answer]: C
