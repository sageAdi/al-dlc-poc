import { Injectable } from '@nestjs/common';
import { EmailVerificationToken, PasswordResetToken, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  createUnverifiedUser(email: string, passwordHash: string) {
    return this.prisma.user.create({
      data: {
        email: this.normalizeEmail(email),
        passwordHash
      }
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: this.normalizeEmail(email) }
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByRefreshTokenHash(refreshTokenHash: string) {
    return this.prisma.user.findUnique({
      where: { refreshTokenHash }
    });
  }

  markEmailVerified(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { emailVerifiedAt: new Date() }
    });
  }

  updatePassword(userId: string, passwordHash: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash }
    });
  }

  setRefreshTokenHash(userId: string, tokenHash: string, expiresAt: Date) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash: tokenHash,
        refreshTokenExpiresAt: expiresAt
      }
    });
  }

  clearRefreshTokenHash(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshTokenHash: null,
        refreshTokenExpiresAt: null
      }
    });
  }

  async replaceVerificationToken(userId: string, tokenHash: string, expiresAt: Date) {
    await this.prisma.emailVerificationToken.updateMany({
      where: {
        userId,
        consumedAt: null
      },
      data: {
        consumedAt: new Date()
      }
    });

    return this.prisma.emailVerificationToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt
      }
    });
  }

  async consumeVerificationToken(tokenHash: string): Promise<{ token: EmailVerificationToken; user: User }> {
    const token = await this.prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    if (!token) {
      throw new TokenLookupError('invalid');
    }
    if (token.consumedAt) {
      throw new TokenLookupError('invalid');
    }
    if (token.expiresAt <= new Date()) {
      throw new TokenLookupError('expired');
    }

    const consumed = await this.prisma.emailVerificationToken.update({
      where: { id: token.id },
      data: { consumedAt: new Date() },
      include: { user: true }
    });

    return { token: consumed, user: consumed.user };
  }

  async storePasswordResetToken(userId: string, tokenHash: string, expiresAt: Date) {
    return this.prisma.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt
      }
    });
  }

  async consumePasswordResetToken(tokenHash: string): Promise<{ token: PasswordResetToken; user: User }> {
    const token = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true }
    });

    if (!token) {
      throw new TokenLookupError('invalid');
    }
    if (token.consumedAt) {
      throw new TokenLookupError('invalid');
    }
    if (token.expiresAt <= new Date()) {
      throw new TokenLookupError('expired');
    }

    const consumed = await this.prisma.passwordResetToken.update({
      where: { id: token.id },
      data: { consumedAt: new Date() },
      include: { user: true }
    });

    return { token: consumed, user: consumed.user };
  }
}

export class TokenLookupError extends Error {
  constructor(public readonly reason: 'invalid' | 'expired') {
    super(`Token ${reason}`);
  }
}
