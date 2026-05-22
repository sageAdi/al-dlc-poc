# Backend Auth API Business Rules

## Account Identity

- Email address is the unique account identifier.
- Email normalization trims whitespace and lowercases the full email address.
- All sign-up, sign-in, and recovery lookup flows use normalized email.

## Password Rules

- Passwords must be at least 10 characters.
- Passwords must include at least one uppercase letter.
- Passwords must include at least one lowercase letter.
- Passwords must include at least one number.
- Passwords must include at least one symbol.
- Passwords are never stored as raw values.

## Sign-Up Rules

- New accounts are created as unverified.
- A verified existing email cannot create a duplicate account.
- An unverified existing email receives generic success and a replacement verification token.
- A replacement verification token invalidates the prior active verification token for that user.
- Verification emails are sent after new unverified account creation and after unverified account replacement-token generation.

## Email Verification Rules

- Verification tokens are single-use.
- Verification tokens must be stored hashed.
- Verification tokens must have an expiry.
- Successful verification marks the token consumed and marks the user verified.
- Reused, consumed, expired, missing, or invalid verification tokens are rejected.

## Sign-In Rules

- Only verified users can sign in.
- Invalid credentials return a user-safe authentication failure.
- Unverified accounts return a verification-required error.
- Successful sign-in creates an access token and refresh token.
- Successful sign-in replaces the stored refresh token hash, allowing one active refresh session per user.
- Raw refresh tokens are never stored.

## Session Rules

- The user record stores one active hashed refresh token and its expiry metadata.
- Refresh succeeds only when the raw refresh token matches the stored hash and is not expired.
- Refresh issues a new access token.
- Sign-out clears the stored refresh token hash.
- Password reset clears the stored refresh token hash.

## Forgot-Password Rules

- Forgot-password responses are always generic success.
- Existing accounts receive a password reset email.
- Unknown emails receive a generic notification email to the submitted address.
- Unknown-email forgot-password requests do not create user records.
- Unknown-email forgot-password requests do not create password reset token records.

## Password Reset Rules

- Password reset tokens are single-use.
- Password reset tokens must be stored hashed.
- Password reset tokens must have an expiry.
- Successful reset marks the reset token consumed.
- Successful reset updates the stored password hash.
- Successful reset clears the stored refresh token hash and requires sign-in again.
- Reused, consumed, expired, missing, or invalid reset tokens are rejected.

## Public User Data Rules

- Public user data may include user ID, normalized email, and email verification timestamp.
- Public user data must not include password hash, token hashes, raw tokens, or internal token metadata.

## Error Handling Rules

- Validation failures return field-specific errors when safe.
- Credential failures do not reveal whether email or password was incorrect.
- Forgot-password does not reveal whether an account exists.
- Token failure states distinguish invalid and expired tokens for UI messaging.
