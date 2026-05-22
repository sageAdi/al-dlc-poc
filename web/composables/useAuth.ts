import { AuthApiError, authClient, type PublicUser, type SignInRequest } from '~/utils/auth-client';

export type AuthStatus = 'unknown' | 'authenticated' | 'anonymous';

export function useAuth() {
  const user = useState<PublicUser | null>('auth:user', () => null);
  const status = useState<AuthStatus>('auth:status', () => 'unknown');
  const pending = useState<boolean>('auth:pending', () => false);

  async function init() {
    pending.value = true;
    try {
      user.value = await authClient.getCurrentUser();
      status.value = 'authenticated';
    } catch {
      user.value = null;
      status.value = 'anonymous';
    } finally {
      pending.value = false;
    }
  }

  async function signIn(input: SignInRequest) {
    pending.value = true;
    try {
      user.value = await authClient.signIn(input);
      status.value = 'authenticated';
    } finally {
      pending.value = false;
    }
  }

  async function signOut() {
    pending.value = true;
    try {
      await authClient.signOut();
    } catch (error) {
      if (!(error instanceof AuthApiError)) {
        throw error;
      }
    } finally {
      user.value = null;
      status.value = 'anonymous';
      pending.value = false;
      await navigateTo('/signin');
    }
  }

  async function requireUser() {
    await init();
    return user.value;
  }

  return {
    user,
    status,
    pending,
    init,
    signIn,
    signOut,
    requireUser
  };
}
