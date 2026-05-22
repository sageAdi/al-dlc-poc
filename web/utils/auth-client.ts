export type PublicUser = {
  id: string;
  email: string;
  emailVerifiedAt: string | null;
};

export type FieldError = {
  field: string;
  message: string;
};

export type AuthApiErrorBody = {
  error?: {
    code?: string;
    message?: string;
    fields?: FieldError[];
  };
};

export class AuthApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly fields: FieldError[] = []
  ) {
    super(message);
  }
}

export type SignUpRequest = {
  email: string;
  password: string;
};

export type SignInRequest = SignUpRequest;

export type VerifyEmailRequest = {
  token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type ApiMessage = {
  message: string;
};

function apiBaseUrl() {
  const config = useRuntimeConfig();
  return config.public.apiBaseUrl as string;
}

async function request<T>(path: string, options: Parameters<typeof $fetch>[1] = {}): Promise<T> {
  try {
    return await $fetch<T>(`${apiBaseUrl()}${path}`, {
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });
  } catch (error: any) {
    const body = error?.data as AuthApiErrorBody | undefined;
    const apiError = body?.error;
    throw new AuthApiError(
      apiError?.code || 'REQUEST_FAILED',
      apiError?.message || 'The request could not be completed.',
      apiError?.fields || []
    );
  }
}

export const authClient = {
  signUp(input: SignUpRequest) {
    return request<ApiMessage>('/auth/signup', {
      method: 'POST',
      body: input
    });
  },
  verifyEmail(input: VerifyEmailRequest) {
    return request<ApiMessage>('/auth/verify-email', {
      method: 'POST',
      body: input
    });
  },
  signIn(input: SignInRequest) {
    return request<PublicUser>('/auth/signin', {
      method: 'POST',
      body: input
    });
  },
  signOut() {
    return request<ApiMessage>('/auth/signout', {
      method: 'POST'
    });
  },
  getCurrentUser() {
    return request<PublicUser>('/auth/me');
  },
  refreshSession() {
    return request<ApiMessage>('/auth/refresh', {
      method: 'POST'
    });
  },
  requestPasswordReset(input: ForgotPasswordRequest) {
    return request<ApiMessage>('/auth/forgot-password', {
      method: 'POST',
      body: input
    });
  },
  resetPassword(input: ResetPasswordRequest) {
    return request<ApiMessage>('/auth/reset-password', {
      method: 'POST',
      body: input
    });
  }
};
