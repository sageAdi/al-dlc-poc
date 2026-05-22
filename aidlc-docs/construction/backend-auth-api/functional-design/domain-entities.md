# Backend Auth API Domain Entities

## User

### Purpose

Represents an account that can verify email, sign in, hold one active refresh session, and reset password.

### Fields

- `id`: Unique user identifier.
- `email`: Normalized unique email address.
- `passwordHash`: Hashed password.
- `emailVerifiedAt`: Timestamp when email verification completed, or null.
- `refreshTokenHash`: Hash of the single active refresh token, or null.
- `refreshTokenExpiresAt`: Expiry timestamp for the active refresh token, or null.
- `createdAt`: Creation timestamp.
- `updatedAt`: Update timestamp.

### Relationships

- Has many verification tokens.
- Has many password reset tokens.

## EmailVerificationToken

### Purpose

Represents a single-use token for verifying an unverified user's email.

### Fields

- `id`: Unique token record identifier.
- `userId`: User the token belongs to.
- `tokenHash`: Hashed token value.
- `expiresAt`: Expiry timestamp.
- `consumedAt`: Timestamp when token was successfully consumed, or null.
- `createdAt`: Creation timestamp.

### Rules

- Raw token is never stored.
- Token can be consumed only once.
- Expired or consumed tokens are rejected.
- New sign-up attempt for an existing unverified account replaces or invalidates prior active verification tokens.

## PasswordResetToken

### Purpose

Represents a single-use token for resetting a user's password.

### Fields

- `id`: Unique token record identifier.
- `userId`: User the token belongs to.
- `tokenHash`: Hashed token value.
- `expiresAt`: Expiry timestamp.
- `consumedAt`: Timestamp when token was successfully consumed, or null.
- `createdAt`: Creation timestamp.

### Rules

- Raw token is never stored.
- Token can be consumed only once.
- Expired or consumed tokens are rejected.
- Successful consumption updates the user password hash and clears active refresh token data.

## PublicUser

### Purpose

Represents user data that may be returned to the Nuxt frontend.

### Fields

- `id`: User identifier.
- `email`: Normalized email address.
- `emailVerifiedAt`: Email verification timestamp or null.

## AuthSession

### Purpose

Represents the result of successful sign-in or refresh operations before controller cookie writing.

### Fields

- `user`: PublicUser.
- `accessToken`: Raw access JWT for HTTP-only cookie writing.
- `refreshToken`: Raw refresh token for HTTP-only cookie writing when issued.
- `refreshTokenExpiresAt`: Refresh token expiry timestamp.

### Rules

- Raw token fields are transient service return values.
- Raw token values are only used for cookie writing and are not persisted.

## EmailMessage

### Purpose

Represents semantic email content requested by auth workflows.

### Variants

- `VerificationEmail`
- `PasswordResetEmail`
- `UnknownAccountPasswordResetNotification`

### Fields

- `to`: Submitted or account email address.
- `subject`: Email subject.
- `htmlBody`: HTML email body.
- `textBody`: Plain text email body.
- `link`: Verification or reset link when applicable.
