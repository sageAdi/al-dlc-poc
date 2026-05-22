# Frontend Auth UI Business Logic Model

## Scope

This functional design covers Unit 2: Frontend Auth UI. It defines page-level flows, frontend auth state, API client behavior, validation, routing, and user-visible error handling.

## Route Model

- `/auth/signup`
- `/auth/verify-email`
- `/auth/signin`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/dashboard`

## Core Workflows

### 1. Sign Up

1. User opens `/auth/signup`.
2. Sign-up form validates required email and password fields.
3. Password validation checks the frontend policy aligned with backend: uppercase, lowercase, number, symbol, and minimum length.
4. Form submits to typed API client `signUp`.
5. API client sends credentials with cookie support enabled.
6. On success, page shows instruction to check email for verification.
7. On validation failure, page shows field-level errors.
8. On duplicate verified account or email delivery failure, page shows a form-level error.

### 2. Verify Email

1. User opens `/auth/verify-email` with token query parameter.
2. Page calls typed API client `verifyEmail`.
3. On success, page shows verification success and link to sign in.
4. On invalid or expired token, page shows a form-level token state message.

### 3. Sign In

1. User opens `/auth/signin`.
2. Sign-in form validates required email and password fields.
3. Form submits to typed API client `signIn`.
4. Backend sets HTTP-only cookies.
5. `useAuth()` stores returned public user.
6. User is redirected to `/dashboard`.
7. Invalid credentials and unverified-account errors render as form-level messages.

### 4. Auth State Refresh

1. On every page navigation, frontend invokes `useAuth().init()`.
2. `useAuth()` calls `/auth/me`.
3. If the call succeeds, `user` is set and status becomes authenticated.
4. If the call fails, `user` is cleared and status becomes anonymous.
5. Token refresh can be attempted by auth client when explicitly invoked by future flow, but v1 route logic is based on `/auth/me`.

### 5. Protected Dashboard

1. User navigates to `/dashboard`.
2. Route middleware relies on `useAuth().init()` result.
3. Authenticated user sees dashboard content.
4. Anonymous user is redirected to `/auth/signin`.

### 6. Forgot Password

1. User opens `/auth/forgot-password`.
2. Form validates required email field and email format.
3. Form submits to typed API client `requestPasswordReset`.
4. Success always shows a generic check-email message.
5. Email delivery failure shows a form-level error.

### 7. Reset Password

1. User opens `/auth/reset-password` with token query parameter.
2. Form validates required password and confirms frontend password policy.
3. Form submits token and password to typed API client `resetPassword`.
4. Success shows reset complete and a path to sign in.
5. Invalid or expired token shows a form-level token state message.

### 8. Sign Out

1. User chooses sign out from dashboard.
2. `useAuth().signOut()` calls typed API client `signOut`.
3. Frontend clears user state.
4. User is redirected to `/signin`.

## State Model

- `user`: current `PublicUser` or null.
- `status`: `unknown`, `authenticated`, or `anonymous`.
- `pending`: boolean for in-flight auth operations.
- `formErrors`: field-level errors keyed by field.
- `message`: form-level success or error message.
