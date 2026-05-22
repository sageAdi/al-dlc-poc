# Services and Orchestration

## Frontend Service Layer

### Auth API Client

- Central typed interface for backend REST calls.
- Always sends `credentials: 'include'` so HTTP-only cookies flow between Nuxt and NestJS.
- Normalizes known backend errors for page display.

### Auth Composable

- Owns user state through Nuxt `useState`.
- Initializes state from `/auth/me`.
- Coordinates sign-in, sign-out, refresh, and protected-route checks.
- Keeps pages thin: pages render forms and call composable/client methods.

### Route Middleware

- Uses `useAuth().requireUser()` for protected pages.
- Redirects anonymous users to sign in.
- Allows public auth pages to render without requiring session state.

## Backend Service Layer

### AuthService Orchestration

AuthService is the primary business orchestration service. It coordinates:

- `UsersService` for user records and token persistence.
- `PasswordService` for password hashing and comparison.
- `TokenService` for JWT, refresh, verification, and reset token generation.
- `EmailService` for SMTP email delivery.
- `ConfigService` for token expiry, cookie, and frontend URL values.

### UsersService Persistence Boundary

UsersService hides Prisma query details from AuthService. It owns user-oriented persistence operations and token records/fields needed by auth flows.

### TokenService Boundary

TokenService owns token creation and token hashing behavior. AuthService decides when tokens are needed; TokenService decides how raw token values and hashes are produced.

### EmailService Boundary

EmailService owns SMTP transport and email body rendering. AuthService passes semantic email inputs such as recipient address and link URL; it does not construct MIME details.

### ConfigService Boundary

ConfigService centralizes environment parsing and typed settings so modules do not read raw environment variables directly.

## Auth Flow Orchestration

### Sign Up

1. Nuxt sign-up page submits to typed auth client.
2. Auth client calls `POST /auth/signup`.
3. AuthController delegates to AuthService.
4. AuthService hashes password, creates unverified user, creates verification token, stores hashed token data, and calls EmailService.
5. EmailService sends HTML and plain text verification email through SMTP.
6. Frontend shows verify-email instruction.

### Verify Email

1. Nuxt verification page reads token from route query.
2. Auth client calls `POST /auth/verify-email`.
3. AuthService hashes/compares token through token persistence methods.
4. UsersService marks email verified and consumes token.
5. Frontend shows success or token error state.

### Sign In

1. Nuxt sign-in page submits credentials.
2. AuthService finds user, verifies password, and blocks unverified accounts.
3. AuthService creates access JWT and opaque refresh token.
4. UsersService stores the single active hashed refresh token on the user record.
5. AuthController sets HTTP-only cookies.
6. Frontend initializes `useAuth().user` and redirects to dashboard.

### Refresh Session

1. Browser sends refresh cookie to `POST /auth/refresh`.
2. AuthService validates raw refresh token against the single hashed token stored on the user record.
3. AuthService issues a new access token cookie.
4. Refresh-token rotation is not modeled as multi-session in v1 because design selected a single stored refresh token per user.

### Forgot Password

1. Nuxt forgot-password page submits email.
2. AuthService returns generic success behavior regardless of account existence.
3. If account exists, AuthService creates reset token, stores hashed token data, and asks EmailService to send reset email.
4. Frontend shows check-email instructions.

### Reset Password

1. Nuxt reset-password page submits token and new password.
2. AuthService validates and consumes reset token.
3. PasswordService hashes new password.
4. UsersService updates password and clears the active refresh token hash.
5. Frontend shows success and path to sign in.

### Sign Out

1. Nuxt calls `POST /auth/signout`.
2. AuthService clears active refresh token hash.
3. AuthController clears HTTP-only cookies.
4. Frontend clears `useAuth().user` and redirects to a public page.
