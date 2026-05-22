import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { AuthApiError } from '../utils/auth-client';
import { handleAuthError } from '../utils/form-errors';

describe('handleAuthError', () => {
  it('maps field errors', () => {
    const fields = ref<Record<string, string>>({});
    const formError = ref('');

    handleAuthError(
      new AuthApiError('VALIDATION_FAILED', 'Validation failed.', [{ field: 'email', message: 'Email is required.' }]),
      fields,
      formError
    );

    expect(fields.value).toEqual({ email: 'Email is required.' });
    expect(formError.value).toBe('');
  });

  it('maps form-level errors', () => {
    const fields = ref<Record<string, string>>({});
    const formError = ref('');

    handleAuthError(new AuthApiError('EMAIL_NOT_VERIFIED', 'Please verify your email.'), fields, formError);

    expect(fields.value).toEqual({});
    expect(formError.value).toBe('Please verify your email.');
  });
});
