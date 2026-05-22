# Backend Auth API Functional Design Plan

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match your needs, choose `X` and describe your preference after the tag.

## Unit Context

- **Unit**: Backend Auth API
- **Code Location**: `api/`
- **Scope**: NestJS REST API, Auth/Users/Email/Prisma/Config modules, PostgreSQL schema, SMTP email delivery, cookie/session behavior, and backend tests.
- **Stories Covered**: US-001 through US-008.

## Planning Checklist

- [x] Confirm account identity and email normalization rules.
- [x] Confirm password policy.
- [x] Confirm verification and reset token lifecycle rules.
- [x] Confirm sign-in and session business behavior.
- [x] Confirm account enumeration behavior.
- [x] Confirm backend domain entities.
- [x] Generate `aidlc-docs/construction/backend-auth-api/functional-design/business-logic-model.md`.
- [x] Generate `aidlc-docs/construction/backend-auth-api/functional-design/business-rules.md`.
- [x] Generate `aidlc-docs/construction/backend-auth-api/functional-design/domain-entities.md`.
- [x] Validate Backend Auth API functional design completeness and consistency.

## Proposed Functional Design Direction

- Treat normalized email as the unique account identifier.
- Create users as unverified until a valid verification token is consumed.
- Store one active hashed refresh token on the user record, per approved application design.
- Store verification and reset tokens as hashed token records with expiry and consumed state.
- Return generic success for forgot-password requests to reduce account enumeration.
- Keep detailed cookie flags, expiry durations, hashing algorithms, and SMTP technical settings for NFR Requirements and NFR Design.

## Question 1
How should email addresses be normalized before uniqueness checks and sign-in lookup?

A) Trim whitespace and lowercase the full email address
B) Trim whitespace only, preserving case
C) Trim whitespace, lowercase domain only, preserve local-part case
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
What password policy should the backend enforce in v1?

A) Minimum 8 characters with at least one letter and one number
B) Minimum 10 characters with at least one uppercase letter, one lowercase letter, one number, and one symbol
C) Minimum 8 characters only
X) Other (please describe after [Answer]: tag below)

[Answer]: B

## Question 3
What should happen if a visitor signs up with an email that already belongs to an unverified account?

A) Return a generic success response and resend/replace the verification token
B) Return a duplicate account error and do not send a new verification email
C) Create no account, but always return the same generic success response as normal sign-up
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
What should happen if a verified user signs in successfully from a new browser while another refresh token is already stored?

A) Replace the stored refresh token, effectively allowing one active refresh session per user
B) Reject the new sign-in until the existing session signs out
C) Keep the existing refresh token and issue only a new access token
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
How should verification and password reset tokens be consumed?

A) Single-use tokens: mark consumed after successful use and reject reused tokens
B) Reusable until expiry
C) Delete token records after successful use
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 6
How should forgot-password responses behave when an email does not exist?

A) Always return generic success and send no email
B) Return not-found error
C) Return generic success and send a generic notification email to the submitted address
X) Other (please describe after [Answer]: tag below)

[Answer]: C

## Question 7
After a successful password reset, what should happen to the active refresh token?

A) Clear the stored refresh token hash and require sign-in again
B) Keep the active refresh token valid
C) Automatically issue a new session
X) Other (please describe after [Answer]: tag below)

[Answer]: A
