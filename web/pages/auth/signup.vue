<template>
  <main class="auth-page">
    <section class="auth-shell">
      <div class="auth-panel">
        <h1 class="auth-title">Create account</h1>
        <p class="auth-description">Use your email and a strong password. You will need to verify your email before signing in.</p>
        <p v-if="message" class="auth-message auth-message-success" data-testid="signup-success-message">{{ message }}</p>
        <p v-if="formError" class="auth-message auth-message-error" data-testid="signup-error-message">{{ formError }}</p>
        <SignUpForm :pending="pending" :field-errors="fieldErrors" @submit="submit" />
        <p class="mt-4 text-sm text-slate-600">
          Already verified?
          <NuxtLink class="auth-link" to="/auth/signin">Sign in</NuxtLink>
        </p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import SignUpForm from '~/components/auth/SignUpForm.vue';
import { authClient } from '~/utils/auth-client';
import { handleAuthError } from '~/utils/form-errors';

const pending = ref(false);
const message = ref('');
const formError = ref('');
const fieldErrors = ref<Record<string, string>>({});

async function submit(payload: { email: string; password: string }) {
  pending.value = true;
  message.value = '';
  formError.value = '';
  fieldErrors.value = {};
  try {
    const result = await authClient.signUp(payload);
    message.value = result.message;
  } catch (error) {
    handleAuthError(error, fieldErrors, formError);
  } finally {
    pending.value = false;
  }
}
</script>
