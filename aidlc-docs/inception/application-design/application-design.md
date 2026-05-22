# Application Design: Email Authentication Flow

## Design Decisions

- **Frontend organization**: Page-first Nuxt organization with pages, composables, route middleware, and small reusable form components.
- **Backend organization**: Separate NestJS modules for Auth, Users, Email, Prisma, and Config.
- **API contract style**: Typed REST client functions with local TypeScript request/response interfaces.
- **Frontend auth state**: Nuxt composable using `useState`, initialized from `/auth/me`.
- **Refresh token persistence**: One hashed refresh token field on the user record.
- **Email templates**: HTML plus plain text templates generated in the backend Email module.

## Component Summary

- `web` owns user-facing auth pages, reusable auth forms, `useAuth()`, route middleware, and typed auth API client functions.
- `api` owns auth controllers, auth orchestration, user persistence, token handling, password hashing, SMTP email delivery, Prisma access, and configuration validation.
- PostgreSQL stores users, token metadata, and the single active refresh token hash selected for v1.
- SMTP is isolated behind EmailService.

## Service Summary

- `AuthService` orchestrates account lifecycle behavior.
- `UsersService` owns database persistence and user/token lookup.
- `TokenService` owns access JWTs and opaque token creation/hashing.
- `PasswordService` owns password hashing and verification.
- `EmailService` owns SMTP transport and HTML/plain text auth emails.
- `ConfigService` owns validated environment-backed settings.

## Interface Summary

- Frontend calls typed REST client functions for all auth operations.
- Backend exposes REST endpoints under `/auth`.
- Backend sets and clears HTTP-only cookies for access and refresh tokens.
- Frontend stores only public user state, not token values.

## Traceability

| Story | Design Coverage |
|---|---|
| US-001 Create Account | Sign-up page, AuthService.signUp, UsersService.createUnverifiedUser, EmailService.sendVerificationEmail |
| US-002 Verify Email | Verify page, AuthService.verifyEmail, token storage/consume methods |
| US-003 Block Unverified Sign-In | AuthService.signIn, UsersService email verification state, frontend sign-in error state |
| US-004 Sign In | Sign-in page, useAuth, AuthController.signIn, TokenService, refresh token hash persistence |
| US-005 Access Protected Dashboard | Route middleware, useAuth.requireUser, `/auth/me`, backend guard |
| US-006 Request Password Reset | Forgot-password page, AuthService.requestPasswordReset, EmailService.sendPasswordResetEmail |
| US-007 Reset Password | Reset-password page, AuthService.resetPassword, PasswordService, token consume methods |
| US-008 Sign Out | useAuth.signOut, AuthController.signOut, UsersService.clearRefreshTokenHash, cookie clearing |

## Detailed Artifacts

- Component definitions: `aidlc-docs/inception/application-design/components.md`
- Component methods: `aidlc-docs/inception/application-design/component-methods.md`
- Service orchestration: `aidlc-docs/inception/application-design/services.md`
- Dependencies and data flow: `aidlc-docs/inception/application-design/component-dependency.md`
