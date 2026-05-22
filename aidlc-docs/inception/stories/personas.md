# Personas: Email Authentication Flow

## Persona 1: Visitor

- **Description**: A person who has not yet created an account or signed in.
- **Goals**:
  - Create an account with an email and password.
  - Understand what to do after submitting the sign-up form.
  - Recover access if they forget their password after account creation.
- **Needs**:
  - Clear form validation.
  - Clear duplicate account and generic recovery messaging.
  - A predictable path from registration to email verification.
- **Relevant Stories**: US-001, US-002, US-006.

## Persona 2: Registered Unverified User

- **Description**: A user who has created an account but has not completed email verification.
- **Goals**:
  - Verify their email address from the email link.
  - Understand why sign-in is blocked before verification.
  - Recover from invalid or expired verification links.
- **Needs**:
  - Clear verification success and failure states.
  - Clear sign-in feedback when the account is not verified.
  - A way to retry registration or request support in a later version if verification fails.
- **Relevant Stories**: US-002, US-003, US-004.

## Persona 3: Verified User

- **Description**: A user with a verified account who can access authenticated areas.
- **Goals**:
  - Sign in securely.
  - Stay authenticated through cookie-based sessions.
  - Access a protected dashboard.
  - Sign out.
  - Reset their password if access is lost.
- **Needs**:
  - Secure, HTTP-only cookie session behavior.
  - Reliable redirects between public and protected pages.
  - Clear password reset instructions and outcomes.
- **Relevant Stories**: US-004, US-005, US-006, US-007, US-008.
