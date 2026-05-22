# Frontend Auth UI Logical Components

## Included Components

### Global Auth Middleware

- **Purpose**: Resolve auth state on every page navigation and protect `/dashboard`.
- **Inputs**: Route target and `useAuth()` state.
- **Outputs**: Continued navigation or redirect to `/auth/signin`.
- **NFR Role**: Enforces SSR-safe auth initialization pattern.

### Auth Composable

- **Purpose**: Own current user state and auth commands.
- **Inputs**: Typed auth API client responses.
- **Outputs**: `user`, `status`, `pending`, `init`, `signIn`, `signOut`, `requireUser`.
- **NFR Role**: Avoids token storage and centralizes auth state.

### Typed Auth API Client

- **Purpose**: Encapsulate backend REST calls.
- **Inputs**: Runtime API base URL and request payloads.
- **Outputs**: Typed success responses or normalized `AuthApiError`.
- **NFR Role**: Provides credentialed, SSR-safe `$fetch` calls and error normalization.

### Auth Global Stylesheet

- **Purpose**: Centralize Tailwind auth UI conventions.
- **Inputs**: Tailwind directives and auth UI class conventions.
- **Outputs**: Consistent auth page, form, button, focus, and error styling.
- **NFR Role**: Implements selected global stylesheet pattern.

### Accessible Form Components

- **Purpose**: Render reusable auth forms.
- **Inputs**: Form state, field errors, pending state, submit callbacks.
- **Outputs**: Accessible form controls and submit events.
- **NFR Role**: Applies labels, ARIA error linkage, focus styles, and stable `data-testid` attributes.

### Frontend Test Harness

- **Purpose**: Support frontend unit/component tests.
- **Inputs**: Vitest, Nuxt test utilities, Vue Test Utils, mocked auth client functions.
- **Outputs**: Tests for pages, forms, middleware behavior, and composable state transitions.
- **NFR Role**: Keeps frontend tests isolated from running backend services.

## Excluded Components For v1

### Component Library

- **Status**: Excluded.
- **Reason**: Tailwind CSS selected with no UI framework.

### Browser E2E Test Harness

- **Status**: Excluded from this unit.
- **Reason**: Frontend unit tests use Vitest/Nuxt/Vue Test Utils; cross-app verification belongs to Integration, Testing, and Setup Verification unit.

### Client Token Store

- **Status**: Excluded.
- **Reason**: Token values must remain in backend-managed HTTP-only cookies.

## Component Relationships

| Component | Depends On | Notes |
|---|---|---|
| Global Auth Middleware | Auth Composable | Runs auth init on every navigation. |
| Auth Composable | Typed Auth API Client | Owns public user state. |
| Typed Auth API Client | Runtime Config | Uses `NUXT_PUBLIC_API_BASE_URL`. |
| Auth Pages | Accessible Form Components, Auth Composable, Typed Auth API Client | Implement user flows. |
| Accessible Form Components | Auth Global Stylesheet | Render consistent forms and errors. |
| Frontend Test Harness | Auth Pages, Auth Composable, mocked Auth API Client | Verifies frontend behavior without backend runtime. |
