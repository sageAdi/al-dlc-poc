# Frontend Components

## Page Components

### `/auth/signup`

- **Component**: `pages/auth/signup.vue`
- **Uses**: `SignUpForm`, auth API client.
- **State**: pending, field errors, form-level message.
- **Behavior**: validates email/password, calls sign-up endpoint, shows check-email success.
- **Test Focus**: renders form, validates input, calls API client, shows success/error state.

### `/auth/verify-email`

- **Component**: `pages/auth/verify-email.vue`
- **Uses**: auth API client.
- **State**: pending, success, token error.
- **Behavior**: reads token query parameter, calls verify-email endpoint, renders success or invalid/expired state.
- **Test Focus**: token query handling and state rendering.

### `/auth/signin`

- **Component**: `pages/auth/signin.vue`
- **Uses**: `SignInForm`, `useAuth()`.
- **State**: pending, field errors, form-level message.
- **Behavior**: validates credentials, calls `useAuth().signIn`, redirects to `/dashboard` on success.
- **Test Focus**: submit behavior, unverified error message, dashboard redirect.

### `/auth/forgot-password`

- **Component**: `pages/auth/forgot-password.vue`
- **Uses**: `ForgotPasswordForm`, auth API client.
- **State**: pending, field errors, form-level message.
- **Behavior**: validates email, calls forgot-password endpoint, shows generic check-email message.
- **Test Focus**: generic success state and email error state.

### `/auth/reset-password`

- **Component**: `pages/auth/reset-password.vue`
- **Uses**: `ResetPasswordForm`, auth API client.
- **State**: pending, field errors, token error, success message.
- **Behavior**: reads token query parameter, validates password, calls reset-password endpoint, shows sign-in path on success.
- **Test Focus**: valid submit, invalid/expired token state, password validation.

### `/dashboard`

- **Component**: `pages/dashboard.vue`
- **Uses**: `auth` route middleware, `useAuth()`.
- **State**: current user.
- **Behavior**: displays protected content and sign-out action.
- **Test Focus**: authenticated rendering and sign-out behavior.

## Reusable Form Components

- `components/auth/SignUpForm.vue`
- `components/auth/SignInForm.vue`
- `components/auth/ForgotPasswordForm.vue`
- `components/auth/ResetPasswordForm.vue`

Each form component:

- Accepts initial pending/error state through props or local state.
- Emits typed submit payload.
- Includes stable `data-testid` attributes for inputs and buttons.
- Displays field-level validation messages.

## Composables and Client

### `composables/useAuth.ts`

- Holds `user`, `status`, and auth commands.
- Calls `/auth/me` on every page navigation through middleware/plugin coordination.
- Provides `signIn`, `signOut`, `init`, and `requireUser`.

### `utils/auth-client.ts`

- Defines local TypeScript request/response interfaces.
- Wraps `$fetch` with `credentials: 'include'`.
- Normalizes backend error envelopes.

## Middleware

### `middleware/auth.global.ts`

- Calls `useAuth().init()` on every page navigation.
- Redirects anonymous users from `/dashboard` to `/auth/signin`.
- Allows public auth pages without requiring authenticated status.
