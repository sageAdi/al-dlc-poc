<template>
  <main class="auth-page">
    <section class="auth-shell">
      <div class="auth-panel">
        <h1 class="auth-title">Set new password</h1>
        <p class="auth-description">Choose a strong password to finish account recovery.</p>
        <p v-if="message" class="auth-message auth-message-success" data-testid="reset-password-success-message">{{ message }}</p>
        <p v-if="formError" class="auth-message auth-message-error" data-testid="reset-password-error-message">{{ formError }}</p>
        <ResetPasswordForm :pending="pending" :field-errors="fieldErrors" @submit="submit" />
        <NuxtLink v-if="message" class="auth-link mt-4 inline-block" to="/auth/signin">Return to sign in</NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import ResetPasswordForm from '~/components/auth/ResetPasswordForm.vue';
import { authClient } from '~/utils/auth-client';
import { handleAuthError } from '~/utils/form-errors';

const route = useRoute();
const pending = ref(false);
const message = ref('');
const formError = ref('');
const fieldErrors = ref<Record<string, string>>({});

async function submit(payload: { password: string }) {
  const token = String(route.query.token || '');
  if (!token) {
    formError.value = 'Reset link is missing a token.';
    return;
  }

  pending.value = true;
  message.value = '';
  formError.value = '';
  fieldErrors.value = {};
  try {
    const result = await authClient.resetPassword({ token, password: payload.password });
    message.value = result.message;
  } catch (error) {
    handleAuthError(error, fieldErrors, formError);
  } finally {
    pending.value = false;
  }
}
</script>
