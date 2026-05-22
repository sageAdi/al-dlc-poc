# Backend Auth API Business Logic Model

## Scope

This functional design covers Unit 1: Backend Auth API. It defines business behavior for account registration, email verification, sign-in, session refresh, current user lookup, sign-out, forgot password, and reset password.

## Core Workflows

### 1. Sign Up

1. Receive email and password.
2. Normalize email by trimming whitespace and lowercasing the full address.
3. Validate password policy.
4. If no account exists:
   - Hash password.
   - Create an unverified user.
   - Create a verification token.
   - Store only the hashed token with expiry and consumed state.
   - Send verification email.
5. If an unverified account exists:
   - Return generic success.
   - Replace the prior verification token with a new single-use token.
   - Send a new verification email.
6. If a verified account exists:
   - Return a user-safe duplicate account error.

### 2. Verify Email

1. Receive raw verification token.
2. Hash or compare token using token verification behavior.
3. Find a matching unexpired, unconsumed verification token.
4. Mark the token consumed.
5. Mark the user email as verified.
6. Return success.
7. Reject missing, invalid, expired, or already consumed tokens.

### 3. Sign In

1. Receive email and password.
2. Normalize email.
3. Find user by normalized email.
4. Verify password if user exists.
5. Reject invalid credentials with a user-safe error.
6. Reject unverified users with a verification-required error.
7. Create access token and refresh token.
8. Store one active hashed refresh token on the user record, replacing any previous stored hash.
9. Return public user data and token data for HTTP-only cookies.

### 4. Refresh Session

1. Receive user identity and raw refresh token from cookie context.
2. Load user and active refresh token hash.
3. Verify raw refresh token against stored hash.
4. Reject missing, mismatched, or expired refresh token.
5. Create a new access token.
6. Keep the single active refresh token unless later NFR design requires rotation.

### 5. Current User

1. Validate access token through auth guard.
2. Load user by ID.
3. Return public user data.
4. Reject missing or invalid access token.

### 6. Sign Out

1. Validate current user if available.
2. Clear stored refresh token hash for the user.
3. Clear auth cookies through controller response behavior.
4. Return success.

### 7. Forgot Password

1. Receive submitted email.
2. Normalize email for lookup.
3. Always return generic success.
4. If account exists:
   - Create a password reset token.
   - Store only the hashed token with expiry and consumed state.
   - Send password reset email.
5. If account does not exist:
   - Send a generic notification email to the submitted address.
   - Do not create user or reset-token records.

### 8. Reset Password

1. Receive raw reset token and new password.
2. Validate password policy.
3. Find a matching unexpired, unconsumed reset token.
4. Mark the token consumed.
5. Hash and store the new password.
6. Clear the user's active refresh token hash.
7. Return success and require sign-in again.
8. Reject missing, invalid, expired, reused, or consumed reset tokens.

## State Transitions

### User Verification State

- `UNVERIFIED` starts after successful sign-up.
- `VERIFIED` is reached after successful email verification.
- Verified users cannot become unverified in v1.

### Token State

- `ACTIVE` token is created with expiry.
- `CONSUMED` token is reached after successful verification or password reset.
- `EXPIRED` is determined by expiry time and rejected.

### Session State

- A user has at most one active refresh token hash.
- Successful sign-in replaces the stored refresh token hash.
- Successful sign-out clears the stored refresh token hash.
- Successful password reset clears the stored refresh token hash.
