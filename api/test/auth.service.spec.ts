import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ApiError } from '../src/common/errors/api-error';
import { ApiErrorCode } from '../src/common/errors/api-error-codes';
import { AuthService } from '../src/auth/auth.service';

describe('AuthService', () => {
  const user = {
    id: 'user-1',
    email: 'user@example.com',
    passwordHash: 'hash',
    emailVerifiedAt: new Date(),
    refreshTokenHash: null,
    refreshTokenExpiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  let usersService: any;
  let emailService: any;
  let passwordService: any;
  let tokenService: any;
  let service: AuthService;

  beforeEach(() => {
    usersService = {
      normalizeEmail: (email: string) => email.trim().toLowerCase(),
      findByEmail: vi.fn(),
      createUnverifiedUser: vi.fn(),
      replaceVerificationToken: vi.fn(),
      consumeVerificationToken: vi.fn(),
      markEmailVerified: vi.fn(),
      setRefreshTokenHash: vi.fn(),
      findByRefreshTokenHash: vi.fn(),
      findById: vi.fn(),
      clearRefreshTokenHash: vi.fn(),
      storePasswordResetToken: vi.fn(),
      consumePasswordResetToken: vi.fn(),
      updatePassword: vi.fn()
    };
    emailService = {
      sendVerificationEmail: vi.fn(),
      sendPasswordResetEmail: vi.fn(),
      sendUnknownAccountPasswordResetNotification: vi.fn()
    };
    passwordService = {
      hashPassword: vi.fn().mockResolvedValue('password-hash'),
      verifyPassword: vi.fn().mockResolvedValue(true),
      validatePolicy: vi.fn()
    };
    tokenService = {
      createOpaqueToken: vi.fn().mockReturnValue('raw-token'),
      hashToken: vi.fn((token: string) => `hash:${token}`),
      addSeconds: vi.fn((date: Date, seconds: number) => new Date(date.getTime() + seconds * 1000)),
      createAccessToken: vi.fn().mockReturnValue('access-token')
    };
    const config: any = {
      auth: {
        accessExpiresInSeconds: 900,
        refreshExpiresInSeconds: 604800,
        emailTokenExpiresInSeconds: 3600
      }
    };

    service = new AuthService(config, usersService, emailService, passwordService, tokenService);
  });

  it('creates an unverified user and sends verification email on sign-up', async () => {
    usersService.findByEmail.mockResolvedValue(null);
    usersService.createUnverifiedUser.mockResolvedValue({ ...user, emailVerifiedAt: null });

    await expect(service.signUp({ email: ' USER@example.com ', password: 'Password1!' })).resolves.toEqual({
      message: 'Check your email to verify your account.'
    });

    expect(usersService.createUnverifiedUser).toHaveBeenCalledWith('user@example.com', 'password-hash');
    expect(usersService.replaceVerificationToken).toHaveBeenCalledWith('user-1', 'hash:raw-token', expect.any(Date));
    expect(emailService.sendVerificationEmail).toHaveBeenCalledWith('user@example.com', 'raw-token');
  });

  it('replaces verification token for existing unverified sign-up', async () => {
    usersService.findByEmail.mockResolvedValue({ ...user, emailVerifiedAt: null });

    await service.signUp({ email: 'user@example.com', password: 'Password1!' });

    expect(usersService.createUnverifiedUser).not.toHaveBeenCalled();
    expect(usersService.replaceVerificationToken).toHaveBeenCalledWith('user-1', 'hash:raw-token', expect.any(Date));
    expect(emailService.sendVerificationEmail).toHaveBeenCalledWith('user@example.com', 'raw-token');
  });

  it('blocks sign-in for unverified accounts', async () => {
    usersService.findByEmail.mockResolvedValue({ ...user, emailVerifiedAt: null });
    passwordService.verifyPassword.mockResolvedValue(true);

    await expect(service.signIn({ email: 'user@example.com', password: 'Password1!' })).rejects.toMatchObject({
      code: ApiErrorCode.EMAIL_NOT_VERIFIED
    } satisfies Partial<ApiError>);
  });

  it('creates a single active refresh token on successful sign-in', async () => {
    usersService.findByEmail.mockResolvedValue(user);

    const session = await service.signIn({ email: 'user@example.com', password: 'Password1!' });

    expect(session.accessToken).toBe('access-token');
    expect(session.refreshToken).toBe('raw-token');
    expect(usersService.setRefreshTokenHash).toHaveBeenCalledWith('user-1', 'hash:raw-token', expect.any(Date));
  });

  it('sends unknown-account notification without creating reset token', async () => {
    usersService.findByEmail.mockResolvedValue(null);

    await service.requestPasswordReset({ email: 'missing@example.com' });

    expect(emailService.sendUnknownAccountPasswordResetNotification).toHaveBeenCalledWith('missing@example.com');
    expect(usersService.storePasswordResetToken).not.toHaveBeenCalled();
  });

  it('clears refresh token after password reset', async () => {
    usersService.consumePasswordResetToken.mockResolvedValue({ user });
    passwordService.hashPassword.mockResolvedValue('new-password-hash');

    await service.resetPassword({ token: 'reset-token', password: 'NewPassword1!' });

    expect(usersService.updatePassword).toHaveBeenCalledWith('user-1', 'new-password-hash');
    expect(usersService.clearRefreshTokenHash).toHaveBeenCalledWith('user-1');
  });
});
