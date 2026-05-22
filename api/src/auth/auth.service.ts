import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ApiError } from '../common/errors/api-error';
import { ApiErrorCode } from '../common/errors/api-error-codes';
import { AppConfig } from '../config/app-config';
import { EmailService } from '../email/email.service';
import { toPublicUser } from '../users/user.types';
import { TokenLookupError, UsersService } from '../users/users.service';
import { AuthSession } from './auth.types';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto, VerifyEmailDto } from './dto/auth.dto';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: AppConfig,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService
  ) {}

  async signUp(input: SignUpDto) {
    const email = this.usersService.normalizeEmail(input.email);
    const existing = await this.usersService.findByEmail(email);

    if (existing?.emailVerifiedAt) {
      throw ApiError.conflict(ApiErrorCode.DUPLICATE_ACCOUNT, 'An account already exists for this email.');
    }

    let user: User;
    if (existing) {
      user = existing;
    } else {
      const passwordHash = await this.passwordService.hashPassword(input.password);
      user = await this.usersService.createUnverifiedUser(email, passwordHash);
    }

    const token = this.tokenService.createOpaqueToken();
    const tokenHash = this.tokenService.hashToken(token);
    const expiresAt = this.tokenService.addSeconds(new Date(), this.config.auth.emailTokenExpiresInSeconds);
    await this.usersService.replaceVerificationToken(user.id, tokenHash, expiresAt);
    await this.emailService.sendVerificationEmail(user.email, token);

    return { message: 'Check your email to verify your account.' };
  }

  async verifyEmail(input: VerifyEmailDto) {
    const tokenHash = this.tokenService.hashToken(input.token);
    const { user } = await this.consumeToken(() => this.usersService.consumeVerificationToken(tokenHash));
    await this.usersService.markEmailVerified(user.id);
    return { message: 'Email verified.' };
  }

  async signIn(input: SignInDto): Promise<AuthSession> {
    const user = await this.usersService.findByEmail(input.email);
    if (!user) {
      throw ApiError.unauthorized(ApiErrorCode.INVALID_CREDENTIALS, 'Invalid email or password.');
    }

    const passwordValid = await this.passwordService.verifyPassword(input.password, user.passwordHash);
    if (!passwordValid) {
      throw ApiError.unauthorized(ApiErrorCode.INVALID_CREDENTIALS, 'Invalid email or password.');
    }

    if (!user.emailVerifiedAt) {
      throw ApiError.unauthorized(ApiErrorCode.EMAIL_NOT_VERIFIED, 'Please verify your email before signing in.');
    }

    return this.createSession(user);
  }

  async refresh(refreshToken: string): Promise<AuthSession> {
    const tokenHash = this.tokenService.hashToken(refreshToken);
    const user = await this.usersService.findByRefreshTokenHash(tokenHash);

    if (!user || !user.refreshTokenExpiresAt || user.refreshTokenExpiresAt <= new Date()) {
      throw ApiError.unauthorized(ApiErrorCode.UNAUTHENTICATED, 'Authentication required.');
    }

    return {
      user: toPublicUser(user),
      accessToken: this.tokenService.createAccessToken({ sub: user.id, email: user.email })
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw ApiError.unauthorized(ApiErrorCode.UNAUTHENTICATED, 'Authentication required.');
    }
    return toPublicUser(user);
  }

  async signOut(userId: string) {
    await this.usersService.clearRefreshTokenHash(userId);
    return { message: 'Signed out.' };
  }

  async requestPasswordReset(input: ForgotPasswordDto) {
    const email = this.usersService.normalizeEmail(input.email);
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      await this.emailService.sendUnknownAccountPasswordResetNotification(email);
      return { message: 'If an account exists, password reset instructions have been sent.' };
    }

    const token = this.tokenService.createOpaqueToken();
    const tokenHash = this.tokenService.hashToken(token);
    const expiresAt = this.tokenService.addSeconds(new Date(), this.config.auth.emailTokenExpiresInSeconds);
    await this.usersService.storePasswordResetToken(user.id, tokenHash, expiresAt);
    await this.emailService.sendPasswordResetEmail(user.email, token);

    return { message: 'If an account exists, password reset instructions have been sent.' };
  }

  async resetPassword(input: ResetPasswordDto) {
    this.passwordService.validatePolicy(input.password);
    const tokenHash = this.tokenService.hashToken(input.token);
    const { user } = await this.consumeToken(() => this.usersService.consumePasswordResetToken(tokenHash));
    const passwordHash = await this.passwordService.hashPassword(input.password);

    await this.usersService.updatePassword(user.id, passwordHash);
    await this.usersService.clearRefreshTokenHash(user.id);

    return { message: 'Password reset complete. Please sign in again.' };
  }

  private async createSession(user: User): Promise<AuthSession> {
    const refreshToken = this.tokenService.createOpaqueToken();
    const refreshTokenHash = this.tokenService.hashToken(refreshToken);
    const refreshTokenExpiresAt = this.tokenService.addSeconds(new Date(), this.config.auth.refreshExpiresInSeconds);

    await this.usersService.setRefreshTokenHash(user.id, refreshTokenHash, refreshTokenExpiresAt);

    return {
      user: toPublicUser(user),
      accessToken: this.tokenService.createAccessToken({ sub: user.id, email: user.email }),
      refreshToken,
      refreshTokenExpiresAt
    };
  }

  private async consumeToken<T>(operation: () => Promise<T>) {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof TokenLookupError) {
        throw ApiError.badRequest(
          error.reason === 'expired' ? ApiErrorCode.TOKEN_EXPIRED : ApiErrorCode.TOKEN_INVALID,
          error.reason === 'expired' ? 'Token expired.' : 'Token invalid.'
        );
      }
      throw error;
    }
  }
}
