# Frontend Auth UI NFR Requirements

## Scope

This document defines non-functional requirements for Unit 2: Frontend Auth UI.

## Rendering

- Nuxt 3 must use universal rendering with SSR enabled.
- Auth pages and dashboard must work with SSR-compatible code.
- Browser-only APIs must be isolated to client-safe code paths.

## Styling and UI

- Use Tailwind CSS for UI styling.
- Keep auth screens lightweight and utilitarian.
- Use consistent layouts, form controls, button states, and error presentation across auth pages.
- Avoid introducing a component framework in v1.

## Accessibility

- Use semantic HTML form labels.
- Controls must be keyboard accessible.
- Error messages must be visible and associated with relevant fields where applicable.
- Focus states must be visible.
- Form submit buttons must expose disabled or pending state clearly.

## Performance

- Target local/PoC best-effort frontend performance.
- Keep auth pages lightweight.
- Avoid unnecessary client dependencies.
- Avoid excessive `/auth/me` payload size because it runs on every page navigation by functional design.

## Configuration

- API base URL must come from runtime config, using a value such as `NUXT_PUBLIC_API_BASE_URL`.
- Auth API client must send credentialed requests so HTTP-only cookies are included.
- No hardcoded backend URL should be required in application code.

## Testability

- Use Vitest with Nuxt test utilities and Vue Test Utils.
- Tests must cover:
  - Auth page rendering.
  - Form submission calls.
  - Field and form-level error rendering.
  - Protected route redirect behavior.
  - `useAuth()` state transitions.
- Interactive elements must have stable `data-testid` attributes.

## Security

- Token values must not be stored in frontend state or local storage.
- Frontend must rely on HTTP-only cookies managed by the backend.
- Raw backend stack traces or sensitive details must not be rendered.

## Maintainability

- Keep page-first Nuxt organization.
- Keep shared auth behavior in `useAuth()` and typed API client functions.
- Keep reusable form components small and focused on form input/submit behavior.
