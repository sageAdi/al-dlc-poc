# User Stories: Email Authentication Flow

## Story Set

- **Breakdown Approach**: User Journey-Based.
- **Personas**: Visitor, Registered Unverified User, Verified User.
- **Acceptance Criteria Format**: Given/When/Then for every story.
- **Error Handling**: Error and edge cases included inside related stories.
- **Priority Style**: Must/Should/Could.

## US-001: Create Account

- **Priority**: Must
- **Persona**: Visitor
- **Story**: As a visitor, I want to create an account with my email and password so that I can begin using protected product features.

### Acceptance Criteria

- Given I am on the sign-up page, when I submit a valid email and password, then the system creates an unverified user account.
- Given the account is created, when registration completes, then the backend sends a verification email through SMTP.
- Given registration succeeds, when the frontend receives the response, then it shows a message instructing me to verify my email.
- Given I submit an email that already exists, when registration is processed, then the system returns a user-safe error state without creating a duplicate account.
- Given I submit invalid input, when validation runs, then field-level errors are shown and the account is not created.

### INVEST Check

- Independent: Can be implemented and tested separately from sign-in.
- Negotiable: UI copy and validation wording can change without altering the goal.
- Valuable: Enables account creation.
- Estimable: Bounded to registration UI, API, persistence, and email send.
- Small: One registration journey.
- Testable: Covered by account creation and email-send assertions.

## US-002: Verify Email Address

- **Priority**: Must
- **Persona**: Registered Unverified User
- **Story**: As a registered unverified user, I want to verify my email from a link so that my account can sign in.

### Acceptance Criteria

- Given I receive a verification email, when I open a valid verification link, then the backend marks my account as verified.
- Given verification succeeds, when the frontend loads the verification page, then it shows a success state and a path to sign in.
- Given I open an invalid verification link, when verification runs, then the page shows an invalid-link error state.
- Given I open an expired verification link, when verification runs, then the page shows an expired-link error state.
- Given a verification token is stored, when persisted, then the raw token is not stored.

### INVEST Check

- Independent: Can be verified through token endpoint and verification page.
- Negotiable: Link expiration timing can be tuned later.
- Valuable: Unlocks account access.
- Estimable: Bounded to verification token storage, endpoint, and page state.
- Small: One verification journey.
- Testable: Covered by valid, invalid, and expired token tests.

## US-003: Block Unverified Sign-In

- **Priority**: Must
- **Persona**: Registered Unverified User
- **Story**: As an unverified user, I want clear feedback when sign-in is blocked so that I know email verification is required.

### Acceptance Criteria

- Given my account is unverified, when I submit correct credentials on the sign-in page, then the backend rejects sign-in.
- Given sign-in is rejected for missing verification, when the frontend handles the response, then it shows a clear verification-required message.
- Given my account is unverified, when sign-in fails, then no authenticated session cookies are set.
- Given incorrect credentials are submitted, when sign-in fails, then the response does not reveal unnecessary account details.

### INVEST Check

- Independent: Focuses on unverified account behavior.
- Negotiable: Error copy can evolve.
- Valuable: Prevents unauthorized access before verification.
- Estimable: Bounded to sign-in guard behavior and UI state.
- Small: One blocked flow.
- Testable: Covered by sign-in rejection and cookie absence assertions.

## US-004: Sign In

- **Priority**: Must
- **Persona**: Verified User
- **Story**: As a verified user, I want to sign in with email and password so that I can access protected pages.

### Acceptance Criteria

- Given my account is verified, when I submit valid credentials, then the backend sets HTTP-only auth cookies.
- Given sign-in succeeds, when the frontend receives the response, then I am redirected to the protected dashboard.
- Given I submit invalid credentials, when sign-in fails, then no auth cookies are set and a safe error message is shown.
- Given cookies are set, when the browser calls the current-user endpoint, then the backend returns my user profile.
- Given access token refresh is required, when the refresh endpoint is called with a valid refresh cookie, then a new access token cookie is issued.

### INVEST Check

- Independent: Can be implemented after user verification exists.
- Negotiable: Redirect destination can change later.
- Valuable: Provides authenticated access.
- Estimable: Bounded to credentials, cookie issuing, current user, and refresh.
- Small: One sign-in journey.
- Testable: Covered by successful and failed sign-in tests.

## US-005: Access Protected Dashboard

- **Priority**: Must
- **Persona**: Verified User
- **Story**: As a verified user, I want to access a protected dashboard so that I can confirm my authenticated session works.

### Acceptance Criteria

- Given I am signed in, when I navigate to the dashboard, then the page loads protected content.
- Given I am not signed in, when I navigate to the dashboard, then I am redirected to sign in.
- Given my session is invalid or expired, when the dashboard checks authentication, then protected content is not shown.
- Given the backend receives an unauthenticated request to a protected endpoint, when authorization runs, then the request is rejected.

### INVEST Check

- Independent: Validates route protection without adding product-specific dashboard features.
- Negotiable: Dashboard content can be minimal for the first version.
- Valuable: Demonstrates end-to-end auth.
- Estimable: Bounded to auth middleware/guard and one page.
- Small: One protected access flow.
- Testable: Covered by frontend route and backend protected endpoint tests.

## US-006: Request Password Reset

- **Priority**: Must
- **Persona**: Visitor
- **Story**: As a user who forgot my password, I want to request a password reset email so that I can regain account access.

### Acceptance Criteria

- Given I am on the forgot-password page, when I submit an email, then the backend accepts the request.
- Given the email belongs to an account, when the request is processed, then a password reset email is sent through SMTP.
- Given the email does not belong to an account, when the request is processed, then the frontend still receives a generic success response.
- Given a reset token is stored, when persisted, then the raw token is not stored.
- Given the request completes, when the frontend renders the result, then it shows instructions to check email.

### INVEST Check

- Independent: Can be tested without completing reset.
- Negotiable: Generic response wording can change.
- Valuable: Starts account recovery.
- Estimable: Bounded to reset request endpoint, token generation, and email send.
- Small: One recovery request flow.
- Testable: Covered by send behavior and non-enumeration response tests.

## US-007: Reset Password

- **Priority**: Must
- **Persona**: Verified User
- **Story**: As a user with a valid reset link, I want to set a new password so that I can sign in again.

### Acceptance Criteria

- Given I open a valid password reset link, when I submit a valid new password, then the backend updates my password hash.
- Given password reset succeeds, when existing refresh tokens are present, then they are invalidated.
- Given password reset succeeds, when I return to sign in, then the new password can be used.
- Given I submit an invalid reset token, when reset is processed, then the page shows an invalid-link error state.
- Given I submit an expired reset token, when reset is processed, then the page shows an expired-link error state.
- Given I submit invalid password input, when validation runs, then the password is not changed.

### INVEST Check

- Independent: Completes the recovery journey.
- Negotiable: Password policy can be tuned.
- Valuable: Restores account access.
- Estimable: Bounded to reset page, endpoint, token validation, and password update.
- Small: One password reset flow.
- Testable: Covered by valid, invalid, expired, and credential-change tests.

## US-008: Sign Out

- **Priority**: Must
- **Persona**: Verified User
- **Story**: As a signed-in user, I want to sign out so that my account is no longer available in the browser session.

### Acceptance Criteria

- Given I am signed in, when I choose sign out, then the backend clears auth cookies.
- Given refresh token records are stored, when I sign out, then the active refresh token is invalidated.
- Given sign-out succeeds, when the frontend updates state, then I am returned to a public auth page.
- Given I call the current-user endpoint after sign-out, when authorization runs, then the backend rejects the request.

### INVEST Check

- Independent: Bounded to ending an authenticated session.
- Negotiable: Post-sign-out redirect can change.
- Valuable: Lets users end sessions.
- Estimable: Small API and frontend state update.
- Small: One sign-out journey.
- Testable: Covered by cookie clearing and protected request rejection tests.

## Coverage Map

| Requirement Area | Stories |
|---|---|
| Sign up | US-001 |
| Email verification | US-002, US-003 |
| Sign in and session cookies | US-004 |
| Protected route/dashboard | US-005 |
| Forgot password | US-006 |
| Reset password | US-007 |
| Sign out | US-008 |
| Backend auth tests | US-001 through US-008 |
| Nuxt page/component tests | US-001 through US-008 |
