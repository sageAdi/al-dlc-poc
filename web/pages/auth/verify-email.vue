<template>
  <main class="auth-page">
    <section class="auth-shell">
      <div class="auth-panel">
        <h1 class="auth-title">Verify email</h1>
        <p v-if="pending" class="auth-message" data-testid="verify-email-pending-message">Verifying your email...</p>
        <p v-else-if="message" class="auth-message auth-message-success" data-testid="verify-email-success-message">{{ message }}</p>
        <p v-else class="auth-message auth-message-error" data-testid="verify-email-error-message">{{ formError }}</p>
        <NuxtLink class="auth-link mt-4 inline-block" to="/auth/signin">Go to sign in</NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { authClient } from '~/utils/auth-client';
import { handleAuthError } from '~/utils/form-errors';

const route = useRoute();
const pending = ref(true);
const message = ref('');
const formError = ref('');

onMounted(async () => {
  const token = String(route.query.token || '');
  if (!token) {
    formError.value = 'Verification link is missing a token.';
    pending.value = false;
    return;
  }

  try {
    const result = await authClient.verifyEmail({ token });
    message.value = result.message;
  } catch (error) {
    const fieldErrors = ref<Record<string, string>>({});
    handleAuthError(error, fieldErrors, formError);
  } finally {
    pending.value = false;
  }
});
</script>
