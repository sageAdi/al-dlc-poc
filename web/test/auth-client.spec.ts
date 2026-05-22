import { describe, expect, it, vi } from 'vitest';
import { AuthApiError, authClient } from '../utils/auth-client';

describe('authClient', () => {
  it('sends credentialed sign-in request', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ id: '1', email: 'a@example.com', emailVerifiedAt: null });
    vi.stubGlobal('$fetch', fetchMock);
    vi.stubGlobal('useRuntimeConfig', () => ({ public: { apiBaseUrl: 'http://localhost:4000' } }));

    await authClient.signIn({ email: 'a@example.com', password: 'Password1!' });

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:4000/auth/signin', expect.objectContaining({
      method: 'POST',
      credentials: 'include'
    }));
  });

  it('normalizes backend error envelopes', async () => {
    vi.stubGlobal('useRuntimeConfig', () => ({ public: { apiBaseUrl: 'http://localhost:4000' } }));
    vi.stubGlobal('$fetch', vi.fn().mockRejectedValue({
      data: {
        error: {
          code: 'EMAIL_NOT_VERIFIED',
          message: 'Please verify your email.',
          fields: []
        }
      }
    }));

    await expect(authClient.getCurrentUser()).rejects.toBeInstanceOf(AuthApiError);
    await expect(authClient.getCurrentUser()).rejects.toMatchObject({
      code: 'EMAIL_NOT_VERIFIED',
      message: 'Please verify your email.'
    });
  });
});
