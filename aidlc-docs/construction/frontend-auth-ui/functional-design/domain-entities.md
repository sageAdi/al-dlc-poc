# Frontend Auth UI Domain Entities

## PublicUser

- **Purpose**: Safe authenticated-user data returned by the backend.
- **Fields**:
  - `id`: user identifier.
  - `email`: normalized email.
  - `emailVerifiedAt`: verification timestamp or null.

## AuthStatus

- **Purpose**: Frontend auth-state lifecycle.
- **Values**:
  - `unknown`: state has not been resolved yet.
  - `authenticated`: `/auth/me` succeeded.
  - `anonymous`: `/auth/me` failed or user signed out.

## ApiErrorEnvelope

- **Purpose**: Normalized backend error structure consumed by pages and forms.
- **Fields**:
  - `code`: stable backend error code.
  - `message`: user-safe message.
  - `fields`: optional field-level validation messages.

## AuthFormState

- **Purpose**: Shared form state used by auth pages.
- **Fields**:
  - `pending`: submit in progress.
  - `message`: form-level status or error text.
  - `fieldErrors`: field-level errors keyed by input name.

## AuthApiClient

- **Purpose**: Typed REST interface to backend auth endpoints.
- **Operations**:
  - `signUp`
  - `verifyEmail`
  - `signIn`
  - `signOut`
  - `getCurrentUser`
  - `refreshSession`
  - `requestPasswordReset`
  - `resetPassword`
