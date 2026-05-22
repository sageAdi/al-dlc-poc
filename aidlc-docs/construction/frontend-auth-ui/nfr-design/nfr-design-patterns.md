# Frontend Auth UI NFR Design Patterns

## SSR-Safe Auth Initialization Pattern

- Use global route middleware to call `useAuth().init()` on every page navigation.
- `useAuth().init()` calls `/auth/me` through the typed auth API client.
- The auth API client uses Nuxt runtime config for the API base URL.
- The API client uses SSR-safe `$fetch`.
- Browser-only behavior must be isolated to client-safe paths.

## Tailwind Styling Pattern

- Use Tailwind CSS for auth UI styling.
- Use one large global stylesheet for auth UI conventions.
- Keep page and form components small, with shared visual rules centralized in the global stylesheet.
- Preserve consistent spacing, button states, error styles, focus styles, and form layouts across auth pages.

## Accessibility Pattern

- Every input has a semantic label.
- Invalid inputs use `aria-invalid`.
- Field-level errors are connected through `aria-describedby`.
- Errors are visible in the UI.
- Focus states are visible for links, buttons, and inputs.
- Submit buttons indicate pending/disabled states.

## API Error Normalization Pattern

- Convert backend error envelopes into `AuthApiError` objects.
- `AuthApiError` includes:
  - `code`
  - `message`
  - `fields`
- Pages and forms consume normalized errors rather than raw `$fetch` errors.
- Field errors render near inputs.
- Auth, token, and email errors render as form-level messages.

## Runtime Config Pattern

- Use `NUXT_PUBLIC_API_BASE_URL` for backend API base URL.
- Do not hardcode `http://localhost:4000` in application code.
- Auth API requests include credentials for HTTP-only cookie support.

## Test Isolation Pattern

- Component and composable tests mock typed auth client functions.
- Tests do not require a running backend.
- Tests verify page rendering, form submits, error display, protected redirects, and auth state transitions.
- Interactive elements use stable `data-testid` attributes.
