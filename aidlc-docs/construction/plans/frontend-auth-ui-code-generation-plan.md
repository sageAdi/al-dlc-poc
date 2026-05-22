# Frontend Auth UI Code Generation Plan

This plan is the single source of truth for Frontend Auth UI code generation. Application code must be generated under `web/`, never under `aidlc-docs/`.

## Unit Context

- **Unit**: Frontend Auth UI
- **Code Location**: `web/`
- **Workspace Root**: `/Users/adi/Documents/AI-DLC POC`
- **Project Type**: Greenfield multi-unit workspace
- **Stories Implemented**: US-001 through US-008 frontend responsibilities
- **Dependencies**:
  - Backend Auth API REST endpoints under `/auth`
  - HTTP-only cookie authentication
  - `NUXT_PUBLIC_API_BASE_URL` runtime config

## Story Traceability

- [x] US-001 Create Account: sign-up page, form validation, check-email success state
- [x] US-002 Verify Email Address: verification page success, invalid, and expired states
- [x] US-003 Block Unverified Sign-In: sign-in verification-required error display
- [x] US-004 Sign In: sign-in page, `useAuth()`, API client, dashboard redirect
- [x] US-005 Access Protected Dashboard: dashboard page and route middleware
- [x] US-006 Request Password Reset: forgot-password page and generic check-email state
- [x] US-007 Reset Password: reset-password page success and token error states
- [x] US-008 Sign Out: sign-out command and frontend state clearing

## Generation Steps

- [x] Step 1: Project Structure Setup
  - Create `web/package.json`, `web/nuxt.config.ts`, `web/tsconfig.json`, `web/vitest.config.ts`, `web/.env.example`, `web/README.md`.
  - Create `web/app.vue`, `web/assets/css/main.css`, `web/pages/`, `web/components/auth/`, `web/composables/`, `web/middleware/`, `web/utils/`, and `web/test/` structure.

- [x] Step 2: Runtime Config and API Client Generation
  - Create `web/utils/auth-client.ts`.
  - Define typed request/response interfaces and `AuthApiError`.
  - Use `NUXT_PUBLIC_API_BASE_URL` through Nuxt runtime config.
  - Ensure all auth requests use `credentials: 'include'`.

- [x] Step 3: Auth State Composable Generation
  - Create `web/composables/useAuth.ts`.
  - Implement `user`, `status`, `pending`, `init`, `signIn`, `signOut`, and `requireUser`.
  - Call `/auth/me` through the typed API client.

- [x] Step 4: Route Middleware Generation
  - Create `web/middleware/auth.global.ts`.
  - Call `useAuth().init()` on every page navigation.
  - Redirect anonymous `/dashboard` access to `/auth/signin`.

- [x] Step 5: Global Tailwind Auth Styles Generation
  - Create `web/assets/css/main.css` with Tailwind directives and global auth UI conventions.
  - Preserve focus styles, form states, error styles, button states, and layout consistency.

- [x] Step 6: Reusable Auth Form Components Generation
  - Create `SignUpForm.vue`, `SignInForm.vue`, `ForgotPasswordForm.vue`, and `ResetPasswordForm.vue`.
  - Include labels, `aria-invalid`, `aria-describedby`, visible field errors, pending states, and stable `data-testid` attributes.

- [x] Step 7: Auth Pages Generation
  - Create `web/pages/auth/signup.vue`, `verify-email.vue`, `signin.vue`, `forgot-password.vue`, and `reset-password.vue`.
  - Implement page-level pending, success, token, field-error, and form-error states.

- [x] Step 8: Dashboard Generation
  - Create `web/pages/dashboard.vue`.
  - Display current public user data and sign-out action.

- [x] Step 9: Frontend Test Generation
  - Create Vitest/Nuxt/Vue Test Utils tests under `web/test/`.
  - Cover page rendering, form submission calls, protected redirect behavior, and auth composable state transitions.
  - Mock typed auth client functions in component/composable tests.

- [x] Step 10: Frontend Documentation Summary
  - Update `web/README.md` with local setup, runtime config, dev command, and test command.
  - Create `aidlc-docs/construction/frontend-auth-ui/code/code-generation-summary.md`.

- [x] Step 11: Final Generation Review
  - Verify no application code was written under `aidlc-docs/`.
  - Verify planned frontend files exist under `web/`.
  - Mark all frontend story traceability checkboxes complete after implementation.
  - Leave Build and Test execution for the AI-DLC Build and Test stage.

## Expected Routes

- `/auth/signup`
- `/auth/verify-email`
- `/auth/signin`
- `/auth/forgot-password`
- `/auth/reset-password`
- `/dashboard`

## Completion Criteria

- Frontend code exists under `web/`.
- Auth pages, form components, auth composable, API client, middleware, Tailwind stylesheet, tests, and README are generated.
- Code generation summary exists under `aidlc-docs/construction/frontend-auth-ui/code/`.
- All plan checkboxes and story traceability boxes are marked complete after generation.
