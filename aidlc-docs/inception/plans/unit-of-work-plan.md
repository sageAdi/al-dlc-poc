# Unit of Work Plan

Please answer each question by filling in the letter choice after the `[Answer]:` tag. If none of the options match your needs, choose `X` and describe your preference after the tag.

## Planning Checklist

- [x] Confirm unit decomposition strategy.
- [x] Confirm development sequencing.
- [x] Confirm integration ownership.
- [x] Confirm test organization.
- [x] Confirm code organization strategy for greenfield multi-app workspace.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work.md`.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-dependency.md`.
- [x] Generate `aidlc-docs/inception/application-design/unit-of-work-story-map.md`.
- [x] Validate unit boundaries and dependencies.
- [x] Ensure all stories are assigned to units.

## Proposed Decomposition Direction

- Use three units of work:
  - Backend Auth API (`api`)
  - Frontend Auth UI (`web`)
  - Integration, Testing, and Local Setup
- Treat the backend unit as the first development dependency because frontend behavior depends on auth API contracts and cookie behavior.
- Treat integration/testing as a final unit that verifies cross-app flows and setup.

## Question 1
How should the project be decomposed into development units?

A) Three units: Backend Auth API, Frontend Auth UI, Integration/Testing/Setup
B) Two units: Backend API and Frontend Web, with tests inside each unit
C) Four units: Backend API, Frontend Web, Database/Prisma, Integration/Testing/Setup
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 2
What development sequence should the units follow?

A) Backend first, then frontend, then integration/testing
B) Frontend first with mocked API, then backend, then integration/testing
C) Backend and frontend in parallel, then integration/testing
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 3
How should database/Prisma work be assigned?

A) Include Prisma schema, migrations, and database service in Backend Auth API unit
B) Create a separate Database/Prisma unit
C) Include only schema in backend unit and defer migrations until integration/testing
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 4
How should test ownership be organized?

A) Backend unit owns backend unit/e2e tests, frontend unit owns Nuxt tests, integration unit owns final cross-app verification
B) Integration/testing unit owns all tests
C) Each unit owns only smoke tests, with comprehensive tests deferred
X) Other (please describe after [Answer]: tag below)

[Answer]: A

## Question 5
How should local setup and documentation be assigned?

A) Integration/Testing/Setup unit owns root README, env examples, and local run instructions
B) Backend and frontend units each own their own setup docs only
C) Defer setup documentation until after implementation
X) Other (please describe after [Answer]: tag below)

[Answer]: B
