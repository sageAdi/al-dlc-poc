import { describe, expect, it, vi, beforeEach } from 'vitest';
import { useAuth } from '../composables/useAuth';

vi.mock('../utils/auth-client', () => ({
  AuthApiError: class AuthApiError extends Error {},
  authClient: {
    getCurrentUser: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn()
  }
}));

describe('useAuth', async () => {
  const { authClient } = await import('../utils/auth-client');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('useState', <T>(key: string, init: () => T) => {
      const store = (globalThis as any).__state || ((globalThis as any).__state = new Map());
      if (!store.has(key)) store.set(key, { value: init() });
      return store.get(key);
    });
    vi.stubGlobal('navigateTo', vi.fn());
    (globalThis as any).__state = new Map();
  });

  it('sets authenticated state when current user loads', async () => {
    vi.mocked(authClient.getCurrentUser).mockResolvedValue({ id: '1', email: 'user@example.com', emailVerifiedAt: null });

    const auth = useAuth();
    await auth.init();

    expect(auth.status.value).toBe('authenticated');
    expect(auth.user.value?.email).toBe('user@example.com');
  });

  it('clears state on sign out', async () => {
    vi.mocked(authClient.signOut).mockResolvedValue({ message: 'Signed out.' });

    const auth = useAuth();
    await auth.signOut();

    expect(auth.status.value).toBe('anonymous');
    expect(auth.user.value).toBeNull();
  });
});
