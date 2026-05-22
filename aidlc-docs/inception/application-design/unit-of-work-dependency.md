# Unit of Work Dependencies

## Dependency Matrix

| Unit | Depends On | Blocks | Reason |
|---|---|---|---|
| Unit 1: Backend Auth API | None | Unit 2, Unit 3 | Defines REST endpoints, cookie behavior, Prisma schema, and email behavior. |
| Unit 2: Frontend Auth UI | Unit 1 API contracts | Unit 3 | Uses backend auth endpoints and cookie/session behavior. |
| Unit 3: Integration, Testing, and Setup Verification | Unit 1, Unit 2 | Completion | Validates cross-app behavior and local setup. |

## Development Sequence

1. **Backend Auth API**
   - Establishes data model, endpoint contracts, cookies, and backend tests.
2. **Frontend Auth UI**
   - Uses backend contracts to implement typed REST client and auth pages.
3. **Integration, Testing, and Setup Verification**
   - Confirms the full auth flow works across both apps.

## Coordination Points

- REST endpoint paths and payloads must remain stable between Unit 1 and Unit 2.
- HTTP-only cookie names and credential settings must align between backend CORS/cookie config and frontend fetch behavior.
- `/auth/me` response shape must match the frontend `PublicUser` interface.
- SMTP configuration must be represented in backend environment examples.
- Each app's setup documentation must explain its own environment variables and dev commands.

## Risk Notes

- Unit 2 can begin after Unit 1 defines endpoint contracts, but final behavior depends on Unit 1 completion.
- The selected single-refresh-token model means simultaneous sessions are limited in v1.
- Integration verification must check browser cookie behavior because unit tests alone do not prove cross-origin cookie setup.
