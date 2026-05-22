import { describe, it } from 'vitest';

describe('Auth API e2e coverage', () => {
  it.todo('rejects unauthenticated protected endpoint requests');
  it.todo('sets auth cookies after verified user sign-in');
  it.todo('rejects unverified user sign-in without setting cookies');
  it.todo('returns email-delivery error when SMTP send fails');
});
