<template>
  <main class="auth-page">
    <section class="auth-shell">
      <div class="auth-panel">
        <h1 class="auth-title">Reset access</h1>
        <p class="auth-description">Enter your email and we will send password reset instructions.</p>
        <p v-if="message" class="auth-message auth-message-success" data-testid="forgot-password-success-message">{{ message }}</p>
        <p v-if="formError" class="auth-message auth-message-error" data-testid="forgot-password-error-message">{{ formError }}</p>
        <ForgotPasswordForm :pending="pending" :field-errors="fieldErrors" @submit="submit" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import ForgotPasswordForm from '~/components/auth/ForgotPasswordForm.vue';
import { authClient } from '~/utils/auth-client';
import { handleAuthError } from '~/utils/form-errors';

const pending = ref(false);
const message = ref('');
const formError = ref('');
const fieldErrors = ref<Record<string, string>>({});

async function submit(payload: { email: string }) {
  pending.value = true;
  message.value = '';
  formError.value = '';
  fieldErrors.value = {};
  try {
    const result = await authClient.requestPasswordReset(payload);
    message.value = result.message;
  } catch (error) {
    handleAuthError(error, fieldErrors, formError);
  } finally {
    pending.value = false;
  }
}
</script>
