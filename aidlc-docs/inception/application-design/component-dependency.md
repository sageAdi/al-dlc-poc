# Component Dependencies

## Dependency Matrix

| Component | Depends On | Dependency Type |
|---|---|---|
| Nuxt Auth Pages | Auth Form Components, Auth Composable, Auth API Client | Direct calls |
| Auth Form Components | Page submit handlers | Emits typed payloads |
| Auth Composable | Auth API Client | Direct calls |
| Auth Middleware | Auth Composable | Direct calls |
| Auth API Client | NestJS Auth REST API | HTTP with credentials |
| AuthController | AuthService | Direct calls |
| AuthService | UsersService, PasswordService, TokenService, EmailService, ConfigService | Service orchestration |
| UsersService | PrismaService | Database access |
| EmailService | ConfigService, SMTP provider | Configuration and external SMTP |
| TokenService | ConfigService | Token settings |
| Guards | TokenService, UsersService | Cookie/JWT validation |

## Communication Patterns

- Frontend to backend communication uses REST over HTTP.
- Browser sessions use HTTP-only cookies set by the backend.
- Nuxt requests include credentials for auth endpoints.
- Backend modules communicate through NestJS dependency injection.
- Prisma is accessed only through backend services, never from Nuxt.
- SMTP is accessed only through EmailService.

## Data Flow: Sign In

1. `SignInPage` receives credentials from `SignInForm`.
2. `useAuth().signIn` calls `authApi.signIn`.
3. `AuthController.signIn` delegates to `AuthService.signIn`.
4. `AuthService` calls `UsersService.findByEmail` and `PasswordService.verifyPassword`.
5. `AuthService` calls `TokenService` to issue access and refresh tokens.
6. `UsersService.setRefreshTokenHash` stores the single active refresh token hash.
7. `AuthController` sets access and refresh cookies.
8. `useAuth()` stores the returned public user.

## Data Flow: Protected Dashboard

1. Nuxt route middleware calls `useAuth().requireUser`.
2. If state is unknown, `useAuth()` calls `authApi.getCurrentUser`.
3. Backend guard validates access cookie.
4. `AuthController.me` returns public user data.
5. Middleware allows or redirects based on result.

## Data Flow: Password Reset

1. `ForgotPasswordPage` submits email to `authApi.requestPasswordReset`.
2. `AuthService.requestPasswordReset` checks for a user through `UsersService`.
3. If user exists, `TokenService.createEmailToken` creates a reset token.
4. `UsersService.storePasswordResetToken` stores hashed token data.
5. `EmailService.sendPasswordResetEmail` sends HTML and plain text email.
6. `ResetPasswordPage` submits token and password to `authApi.resetPassword`.
7. `AuthService.resetPassword` consumes token, hashes password, updates user, and clears refresh token hash.

## Dependency Constraints

- `web` depends on stable REST endpoint behavior from `api`.
- `api` depends on PostgreSQL availability through Prisma.
- Auth email flows depend on valid SMTP configuration.
- Route protection depends on `/auth/me` and backend cookie validation.
- The single-refresh-token model means signing in from another browser can replace the previous refresh token.
