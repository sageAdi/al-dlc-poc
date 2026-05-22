import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { ApiError } from '../common/errors/api-error';
import { ApiErrorCode } from '../common/errors/api-error-codes';

@Injectable()
export class PasswordService {
  async hashPassword(password: string) {
    this.validatePolicy(password);
    return bcrypt.hash(password, 12);
  }

  verifyPassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }

  validatePolicy(password: string) {
    const valid =
      password.length >= 10 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password);

    if (!valid) {
      throw ApiError.badRequest(ApiErrorCode.VALIDATION_FAILED, 'Password does not meet policy.', [
        {
          field: 'password',
          message: 'Password must be at least 10 characters and include uppercase, lowercase, number, and symbol.'
        }
      ]);
    }
  }
}
