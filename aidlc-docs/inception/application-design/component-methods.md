# Component Methods

## Frontend Methods

### Auth API Client

```ts
type PublicUser = {
  id: string;
  email: string;
  emailVerifiedAt: string | null;
};

type ApiMessage = {
  message: string;
};
```

- `signUp(input: SignUpRequest): Promise<ApiMessage>`
  - Creates an unverified account and triggers verification email delivery.
- `verifyEmail(input: VerifyEmailRequest): Promise<ApiMessage>`
  - Confirms a verification token and activates the account.
- `signIn(input: SignInRequest): Promise<PublicUser>`
  - Authenticates a verified user and relies on backend-set HTTP-only cookies.
- `signOut(): Promise<ApiMessage>`
  - Clears backend auth cookies and ends the stored refresh session.
- `getCurrentUser(): Promise<PublicUser | null>`
  - Reads authenticated user state from `/auth/me`.
- `refreshSession(): Promise<ApiMessage>`
  - Requests a fresh access-token cookie using the refresh cookie.
- `requestPasswordReset(input: ForgotPasswordRequest): Promise<ApiMessage>`
  - Starts password recovery.
- `resetPassword(input: ResetPasswordRequest): Promise<ApiMessage>`
  - Completes password recovery with a valid reset token.

### `useAuth()` Composable

- `user: Ref<PublicUser | null>`
  - Nuxt `useState`-backed current user.
- `status: Ref<'unknown' | 'authenticated' | 'anonymous'>`
  - Current frontend session status.
- `init(): Promise<void>`
  - Loads `/auth/me` and updates auth state.
- `signIn(input: SignInRequest): Promise<void>`
  - Calls API sign-in and updates `user`.
- `signOut(): Promise<void>`
  - Calls API sign-out and clears `user`.
- `refresh(): Promise<boolean>`
  - Calls API refresh and reports whether refresh succeeded.
- `requireUser(): Promise<PublicUser | null>`
  - Ensures auth state is initialized for route middleware.

## Backend Methods

### `AuthController`

- `POST /auth/signup`
  - Calls `AuthService.signUp`.
- `POST /auth/verify-email`
  - Calls `AuthService.verifyEmail`.
- `POST /auth/signin`
  - Calls `AuthService.signIn` and sets auth cookies.
- `POST /auth/refresh`
  - Calls `AuthService.refresh` and rotates/updates access cookie.
- `GET /auth/me`
  - Returns the current authenticated user.
- `POST /auth/signout`
  - Calls `AuthService.signOut` and clears auth cookies.
- `POST /auth/forgot-password`
  - Calls `AuthService.requestPasswordReset`.
- `POST /auth/reset-password`
  - Calls `AuthService.resetPassword`.

### `AuthService`

- `signUp(input: SignUpDto): Promise<void>`
  - Creates an unverified user and sends a verification email.
- `verifyEmail(token: string): Promise<void>`
  - Validates verification token and marks the user verified.
- `signIn(input: SignInDto): Promise<AuthSession>`
  - Validates credentials, blocks unverified accounts, and returns token data for cookies.
- `refresh(userId: string, refreshToken: string): Promise<AuthSession>`
  - Validates the refresh token against the single hashed value stored on the user record.
- `getCurrentUser(userId: string): Promise<PublicUser>`
  - Returns safe current-user data.
- `signOut(userId: string): Promise<void>`
  - Clears the stored hashed refresh token.
- `requestPasswordReset(email: string): Promise<void>`
  - Creates a password reset token and sends email when the account exists, while preserving generic response behavior.
- `resetPassword(input: ResetPasswordDto): Promise<void>`
  - Validates reset token, updates password hash, and clears the stored refresh token.

### `UsersService`

- `createUnverifiedUser(email: string, passwordHash: string): Promise<User>`
  - Creates a new unverified user.
- `findByEmail(email: string): Promise<User | null>`
  - Finds user by normalized email.
- `findById(id: string): Promise<User | null>`
  - Finds user by ID.
- `markEmailVerified(userId: string): Promise<void>`
  - Sets email verification timestamp.
- `updatePassword(userId: string, passwordHash: string): Promise<void>`
  - Replaces the password hash.
- `setRefreshTokenHash(userId: string, tokenHash: string, expiresAt: Date): Promise<void>`
  - Stores the single active refresh-token hash and expiry on the user record.
- `clearRefreshTokenHash(userId: string): Promise<void>`
  - Removes active refresh-token data from the user record.
- `storeVerificationToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>`
  - Stores hashed email verification token data.
- `consumeVerificationToken(tokenHash: string): Promise<User>`
  - Finds and consumes a valid verification token.
- `storePasswordResetToken(userId: string, tokenHash: string, expiresAt: Date): Promise<void>`
  - Stores hashed password reset token data.
- `consumePasswordResetToken(tokenHash: string): Promise<User>`
  - Finds and consumes a valid password reset token.

### `TokenService`

- `createAccessToken(user: User): Promise<string>`
  - Creates a short-lived JWT for the access cookie.
- `createRefreshToken(): Promise<string>`
  - Creates an opaque refresh token value for the refresh cookie.
- `hashToken(token: string): Promise<string>`
  - Hashes verification, reset, or refresh tokens before persistence.
- `verifyHashedToken(token: string, tokenHash: string): Promise<boolean>`
  - Compares raw token input to stored token hash.
- `createEmailToken(): Promise<string>`
  - Creates an opaque token for email links.

### `PasswordService`

- `hashPassword(password: string): Promise<string>`
  - Hashes a user password before storage.
- `verifyPassword(password: string, passwordHash: string): Promise<boolean>`
  - Verifies sign-in credentials.

### `EmailService`

- `sendVerificationEmail(input: VerificationEmailInput): Promise<void>`
  - Sends HTML and plain text verification email.
- `sendPasswordResetEmail(input: PasswordResetEmailInput): Promise<void>`
  - Sends HTML and plain text password reset email.

### `PrismaService`

- `onModuleInit(): Promise<void>`
  - Connects Prisma client.
- `enableShutdownHooks(): Promise<void>`
  - Coordinates shutdown lifecycle.

### `ConfigService`

- `getAuthConfig(): AuthConfig`
  - Returns JWT, token, and password-related settings.
- `getCookieConfig(): CookieConfig`
  - Returns cookie names and security settings.
- `getCorsConfig(): CorsConfig`
  - Returns frontend origin and credential settings.
- `getSmtpConfig(): SmtpConfig`
  - Returns SMTP connection and sender settings.
