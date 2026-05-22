# Frontend Auth UI Functional Design Plan

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match your needs, choose `X` and describe your preference after the tag.

## Unit Context

- **Unit**: Frontend Auth UI
- **Code Location**: `web/`
- **Scope**: Nuxt 3 auth pages, reusable forms, typed REST client, `useAuth()` composable, route middleware, protected dashboard, and basic frontend tests.
- **Stories Covered**: US-001 through US-008 frontend responsibilities.

## Planning Checklist

- [x] Confirm route paths and page names.
- [x] Confirm form validation ownership.
- [x] Confirm auth error display behavior.
- [x] Confirm `useAuth()` initialization behavior.
- [x] Confirm protected-route redirect behavior.
- [x] Confirm frontend test focus.
- [x] Generate `aidlc-docs/construction/frontend-auth-ui/functional-design/business-logic-model.md`.
- [x] Generate `aidlc-docs/construction/frontend-auth-ui/functional-design/business-rules.md`.
- [x] Generate `aidlc-docs/construction/frontend-auth-ui/functional-design/domain-entities.md`.
- [x] Generate `aidlc-docs/construction/frontend-auth-ui/functional-design/frontend-components.md`.
- [x] Validate Frontend Auth UI functional design completeness and consistency.

## Proposed Functional Design Direction

- Use page routes: `/signup`, `/verify-email`, `/signin`, `/forgot-password`, `/reset-password`, and `/dashboard`.
- Keep frontend validation aligned with backend DTOs, but treat backend as final authority.
- Use typed API client functions that include credentials for cookie-based auth requests.
- Keep authenticated user state in `useAuth()` via Nuxt `useState`.
- Use route middleware to protect `/dashboard` and redirect anonymous users to `/signin`.

## Question 1
Which route path set should the Nuxt app use?

A) `/signup`, `/verify-email`, `/signin`, `/forgot-password`, `/reset-password`, `/dashboard`
B) `/auth/signup`, `/auth/verify-email`, `/auth/signin`, `/auth/forgot-password`, `/auth/reset-password`, `/dashboard`
C) `/register`, `/verify`, `/login`, `/forgot-password`, `/reset-password`, `/app`
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 2
How should frontend form validation be handled?

A) Client-side required/email/password checks before submit, with backend error envelope as final authority
B) Backend-only validation, submit all forms directly and render returned errors
C) Full schema validation on frontend mirroring backend DTOs
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
How should auth API errors be displayed?

A) Show field-level errors when provided and a form-level message for auth/token/email errors
B) Show only a single form-level error message
C) Show raw backend error code and message for debugging
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
When should `useAuth()` call `/auth/me`?

A) Lazily on protected route access and on app startup when auth state is unknown
B) On every page navigation
C) Only after successful sign-in
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 5
What should happen after successful sign-out?

A) Clear frontend user state and redirect to `/signin`
B) Clear frontend user state and redirect to `/signup`
C) Clear frontend user state and stay on current page
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
What should basic frontend tests focus on?

A) Page rendering, form submission calls, protected redirect behavior, and auth composable state transitions
B) Snapshot tests only
C) No frontend tests until integration phase
X) Other (please describe after [Answer]: tag below)

[Answer]: A
