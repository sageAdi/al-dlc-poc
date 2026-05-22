import { describe, expect, it } from 'vitest';
import { PasswordService } from '../src/auth/password.service';
import { ApiErrorCode } from '../src/common/errors/api-error-codes';

describe('PasswordService', () => {
  const service = new PasswordService();

  it('rejects weak passwords', () => {
    try {
      service.validatePolicy('password');
      throw new Error('Expected password policy validation to fail');
    } catch (error) {
      expect(error).toMatchObject({
        code: ApiErrorCode.VALIDATION_FAILED
      });
    }
  });

  it('accepts password with uppercase, lowercase, number, and symbol', () => {
    expect(() => service.validatePolicy('GoodPass1!')).not.toThrow();
  });
});
