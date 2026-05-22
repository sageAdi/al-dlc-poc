# Application Components

## Frontend Components (`web`)

### Auth Pages

- **Purpose**: Provide page-level user journeys for account creation, verification, sign-in, recovery, and protected access.
- **Responsibilities**:
  - Render sign-up, verify-email, sign-in, forgot-password, reset-password, and dashboard pages.
  - Submit typed requests through the frontend auth API client.
  - Display success, validation, and error states.
- **Interfaces**:
  - Calls `useAuth()` composable for session state and commands.
  - Calls auth API client functions for one-off flows such as verify email and reset password.

### Auth Form Components

- **Purpose**: Reusable form elements for auth pages.
- **Responsibilities**:
  - Capture email and password inputs.
  - Emit submit events with typed payloads.
  - Display field-level and form-level errors.
- **Interfaces**:
  - `SignUpForm`
  - `SignInForm`
  - `ForgotPasswordForm`
  - `ResetPasswordForm`

### Auth Composable

- **Purpose**: Central frontend auth state and orchestration.
- **Responsibilities**:
  - Store authenticated user with Nuxt `useState`.
  - Initialize current user from `/auth/me`.
  - Expose sign-in, sign-out, refresh, and current-user actions.
  - Coordinate redirects after auth state changes.
- **Interfaces**:
  - `useAuth()`

### Auth Middleware

- **Purpose**: Protect authenticated routes.
- **Responsibilities**:
  - Check current auth state before protected page access.
  - Call `/auth/me` through `useAuth()` when state is unknown.
  - Redirect unauthenticated users to sign in.
- **Interfaces**:
  - Route middleware for protected dashboard pages.

### Auth API Client

- **Purpose**: Typed REST wrapper around backend auth endpoints.
- **Responsibilities**:
  - Encapsulate `$fetch` calls with credentials included.
  - Define local request and response TypeScript interfaces.
  - Normalize API error responses for pages and composables.
- **Interfaces**:
  - Typed functions for sign up, verify email, sign in, sign out, refresh, current user, forgot password, and reset password.

## Backend Components (`api`)

### Auth Module

- **Purpose**: Own the authentication lifecycle.
- **Responsibilities**:
  - Register users as unverified accounts.
  - Generate verification and reset tokens.
  - Verify email tokens.
  - Validate credentials and issue cookies.
  - Refresh and clear sessions.
  - Coordinate forgot-password and reset-password flows.
- **Interfaces**:
  - `AuthController`
  - `AuthService`
  - `TokenService`
  - `PasswordService`
  - Auth guards and decorators.

### Users Module

- **Purpose**: Own user persistence and lookup behavior.
- **Responsibilities**:
  - Create user records.
  - Query users by ID and email.
  - Update email verification state.
  - Update password hash.
  - Store one hashed refresh token value on the user record.
  - Store hashed verification and password reset tokens or token metadata as required by detailed design.
- **Interfaces**:
  - `UsersService`
  - Prisma-backed repository methods.

### Email Module

- **Purpose**: Send user-facing auth emails through SMTP.
- **Responsibilities**:
  - Configure SMTP transport from environment variables.
  - Send verification emails.
  - Send password reset emails.
  - Render HTML plus plain text email bodies.
- **Interfaces**:
  - `EmailService`
  - Template rendering helpers.

### Prisma Module

- **Purpose**: Provide database access through Prisma.
- **Responsibilities**:
  - Initialize Prisma client.
  - Expose database client to feature modules.
  - Support migrations for auth schema.
- **Interfaces**:
  - `PrismaService`

### Config Module

- **Purpose**: Centralize environment configuration.
- **Responsibilities**:
  - Validate required auth, database, CORS, cookie, frontend URL, and SMTP settings.
  - Expose typed configuration to backend modules.
- **Interfaces**:
  - Typed configuration providers.

### Auth Guards

- **Purpose**: Protect backend endpoints.
- **Responsibilities**:
  - Validate access-token cookies.
  - Attach authenticated user identity to requests.
  - Reject unauthenticated requests.
- **Interfaces**:
  - `JwtAuthGuard`
  - `CurrentUser` decorator.
