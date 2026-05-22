export type AuthEmailInput = {
  appUrl: string;
  email: string;
  token?: string;
};

export function verificationEmail(input: AuthEmailInput) {
  const link = `${input.appUrl}/auth/verify-email?token=${encodeURIComponent(input.token || '')}`;
  return {
    subject: 'Verify your email',
    text: `Verify your email by opening this link: ${link}`,
    html: `<p>Verify your email by opening this link:</p><p><a href="${link}">${link}</a></p>`
  };
}

export function passwordResetEmail(input: AuthEmailInput) {
  const link = `${input.appUrl}/auth/reset-password?token=${encodeURIComponent(input.token || '')}`;
  return {
    subject: 'Reset your password',
    text: `Reset your password by opening this link: ${link}`,
    html: `<p>Reset your password by opening this link:</p><p><a href="${link}">${link}</a></p>`
  };
}

export function unknownAccountPasswordResetNotification() {
  return {
    subject: 'Password reset request',
    text: 'A password reset was requested for this email address. No account was found, so no password was changed.',
    html: '<p>A password reset was requested for this email address.</p><p>No account was found, so no password was changed.</p>'
  };
}
