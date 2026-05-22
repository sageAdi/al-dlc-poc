# Email Verification Route Fix Plan

## Request

Fix verification email links that point to `/verify-email` while the Nuxt UI route is `/auth/verify-email`.

## Scope

- Bug fix in backend email template generation.
- Add focused backend tests for generated email links.
- No frontend route changes.
- No Mermaid or ASCII diagrams required.

## Content Validation

- [x] Confirmed no Mermaid diagrams are included.
- [x] Confirmed no ASCII diagrams are included.
- [x] Confirmed Markdown uses standard headings, lists, and inline code only.

## Findings

- [x] Verified Nuxt verification page exists at `web/pages/auth/verify-email.vue`.
- [x] Verified Nuxt reset-password page exists at `web/pages/auth/reset-password.vue`.
- [x] Verified backend email template previously generated `/verify-email` and `/reset-password` links.

## Execution Steps

- [x] Update verification email template to generate `/auth/verify-email?token=...`.
- [x] Update password reset email template to generate `/auth/reset-password?token=...` for consistency with the UI route.
- [x] Add unit tests for verification and reset email template links.
- [x] Remove unused backend Vitest path plugin that blocked test startup with an ESM/CJS config load error.
- [x] Run focused backend tests for email templates.
- [x] Record verification results in the audit trail.

## Output

- `api/src/email/email.templates.ts`
- `api/test/email.templates.spec.ts`
- `api/vitest.config.ts`
