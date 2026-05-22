# Frontend Auth UI Business Rules

## Routing Rules

- Public auth pages use `/auth/*` routes.
- Protected dashboard uses `/dashboard`.
- Anonymous users attempting `/dashboard` are redirected to `/auth/signin`.
- After successful sign-in, users are redirected to `/dashboard`.
- After successful sign-out, frontend user state is cleared and users are redirected to `/signin`.

## Validation Rules

- Frontend performs basic validation before submit.
- Email inputs must be present and shaped like email addresses.
- Password inputs must be present.
- Sign-up and reset-password pages check password length and character categories before submit.
- Backend validation remains the final authority.
- Backend field errors override or supplement frontend field errors.

## Error Display Rules

- Field-level errors render near the relevant input when provided by client or backend validation.
- Auth, token, and email delivery failures render as form-level messages.
- Raw backend stack traces or sensitive details are never displayed.
- Backend error codes may be used for branching but are not shown as primary user-facing copy.

## Auth State Rules

- `useAuth()` stores public user state with Nuxt `useState`.
- `useAuth()` calls `/auth/me` on every page navigation.
- If `/auth/me` succeeds, auth state becomes authenticated.
- If `/auth/me` fails, auth state becomes anonymous.
- Token values are never stored in frontend state.

## API Client Rules

- Typed auth API client functions call backend REST endpoints under `/auth`.
- Every auth request includes credentials so HTTP-only cookies are sent.
- API client normalizes backend error envelopes into frontend-friendly error objects.

## Test Rules

- Basic frontend tests cover page rendering.
- Tests cover form submission calls.
- Tests cover protected route redirect behavior.
- Tests cover auth composable state transitions.
