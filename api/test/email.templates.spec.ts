import { describe, expect, it } from 'vitest';
import { passwordResetEmail, verificationEmail } from '../src/email/email.templates';

describe('auth email templates', () => {
  it('links verification emails to the Nuxt auth verification route', () => {
    const template = verificationEmail({
      appUrl: 'http://localhost:3000',
      email: 'user@example.com',
      token: 'token with spaces'
    });

    const expectedLink = 'http://localhost:3000/auth/verify-email?token=token%20with%20spaces';

    expect(template.text).toContain(expectedLink);
    expect(template.html).toContain(expectedLink);
  });

  it('links password reset emails to the Nuxt auth reset route', () => {
    const template = passwordResetEmail({
      appUrl: 'http://localhost:3000',
      email: 'user@example.com',
      token: 'reset token'
    });

    const expectedLink = 'http://localhost:3000/auth/reset-password?token=reset%20token';

    expect(template.text).toContain(expectedLink);
    expect(template.html).toContain(expectedLink);
  });
});
