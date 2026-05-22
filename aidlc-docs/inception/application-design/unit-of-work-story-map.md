# Unit of Work Story Map

## Story Assignment

| Story | Backend Auth API | Frontend Auth UI | Integration/Testing/Setup |
|---|---|---|---|
| US-001 Create Account | Primary | Primary | Verify |
| US-002 Verify Email Address | Primary | Primary | Verify |
| US-003 Block Unverified Sign-In | Primary | Primary | Verify |
| US-004 Sign In | Primary | Primary | Verify |
| US-005 Access Protected Dashboard | Primary | Primary | Verify |
| US-006 Request Password Reset | Primary | Primary | Verify |
| US-007 Reset Password | Primary | Primary | Verify |
| US-008 Sign Out | Primary | Primary | Verify |

## Unit 1 Story Responsibilities: Backend Auth API

- **US-001**: Create unverified users, hash passwords, store verification token data, send verification email.
- **US-002**: Validate verification tokens and mark users verified.
- **US-003**: Reject sign-in for unverified users and avoid setting cookies.
- **US-004**: Validate credentials, issue auth cookies, support refresh and current-user lookup.
- **US-005**: Protect backend endpoint with auth guard.
- **US-006**: Generate password reset tokens and send reset emails without account enumeration.
- **US-007**: Validate reset tokens, update password hash, clear active refresh token.
- **US-008**: Clear cookies and stored refresh token hash.

## Unit 2 Story Responsibilities: Frontend Auth UI

- **US-001**: Sign-up page, form validation display, verify-email instruction state.
- **US-002**: Verification page success, invalid-link, and expired-link states.
- **US-003**: Sign-in page verification-required error display.
- **US-004**: Sign-in page, `useAuth()`, typed auth client, dashboard redirect.
- **US-005**: Protected dashboard and route middleware.
- **US-006**: Forgot-password page and generic check-email state.
- **US-007**: Reset-password page success and token error states.
- **US-008**: Sign-out command and frontend state clearing.

## Unit 3 Story Responsibilities: Integration, Testing, and Setup Verification

- Verify all stories through combined backend/frontend behavior.
- Confirm backend and frontend tests run.
- Confirm local setup instructions are usable for each app.
- Confirm environment examples cover database, JWT, cookies, CORS, frontend URL, and SMTP needs.
