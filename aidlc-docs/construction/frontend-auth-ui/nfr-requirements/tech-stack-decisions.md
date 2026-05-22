# Frontend Auth UI Tech Stack Decisions

## Runtime and Framework

- **Frontend Framework**: Nuxt 3.
- **Rendering Mode**: Universal rendering with SSR enabled.
- **Language**: TypeScript.
- **Reasoning**: Matches approved requirements and supports a standard Nuxt application model.

## Styling

- **Styling Tool**: Tailwind CSS.
- **Component Framework**: None in v1.
- **Reasoning**: Tailwind supports fast, lightweight auth UI implementation without adding a component library.

## State Management

- **Auth State**: Nuxt `useState` inside `useAuth()`.
- **Store Library**: No Pinia for v1.
- **Reasoning**: Approved application design selected composable state and auth scope is small.

## API Client

- **API Style**: Typed REST client functions.
- **Base URL**: Runtime config, e.g. `NUXT_PUBLIC_API_BASE_URL`.
- **Credentials**: Include credentials on auth requests.
- **Reasoning**: Required for backend HTTP-only cookie integration.

## Testing

- **Test Runner**: Vitest.
- **Nuxt Test Utilities**: Nuxt test utilities.
- **Component Testing**: Vue Test Utils.
- **Reasoning**: Selected stack supports page/composable/component tests without requiring browser automation for v1.

## Accessibility Baseline

- Semantic labels.
- Keyboard-accessible controls.
- Visible field and form-level errors.
- Visible focus states.

## Explicitly Out of Scope For v1

- Nuxt UI component library.
- Playwright-only frontend test strategy.
- Strict production performance SLOs.
- Frontend token storage in local storage or session storage.
