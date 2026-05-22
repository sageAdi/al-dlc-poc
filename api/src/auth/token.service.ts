import { Injectable } from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../common/errors/api-error';
import { ApiErrorCode } from '../common/errors/api-error-codes';
import { AppConfig } from '../config/app-config';
import { AccessTokenPayload } from './auth.types';

@Injectable()
export class TokenService {
  constructor(private readonly config: AppConfig) {}

  createAccessToken(payload: AccessTokenPayload) {
    return jwt.sign(payload, this.config.auth.accessSecret, {
      expiresIn: this.config.auth.accessExpiresInSeconds
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    try {
      return jwt.verify(token, this.config.auth.accessSecret) as AccessTokenPayload;
    } catch {
      throw ApiError.unauthorized(ApiErrorCode.UNAUTHENTICATED, 'Authentication required.');
    }
  }

  createOpaqueToken() {
    return randomBytes(32).toString('hex');
  }

  hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  addSeconds(date: Date, seconds: number) {
    return new Date(date.getTime() + seconds * 1000);
  }
}
