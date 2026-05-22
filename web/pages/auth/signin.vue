<template>
  <main class="auth-page">
    <section class="auth-shell">
      <div class="auth-panel">
        <h1 class="auth-title">Sign in</h1>
        <p class="auth-description">Access your dashboard with your verified email account.</p>
        <p v-if="formError" class="auth-message auth-message-error" data-testid="signin-error-message">{{ formError }}</p>
        <SignInForm :pending="pending" :field-errors="fieldErrors" @submit="submit" />
        <div class="mt-4 flex items-center justify-between gap-3">
          <NuxtLink class="auth-link" to="/auth/signup">Create account</NuxtLink>
          <NuxtLink class="auth-link" to="/auth/forgot-password">Forgot password?</NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import SignInForm from '~/components/auth/SignInForm.vue';
import { handleAuthError } from '~/utils/form-errors';

const auth = useAuth();
const pending = computed(() => auth.pending.value);
const formError = ref('');
const fieldErrors = ref<Record<string, string>>({});

async function submit(payload: { email: string; password: string }) {
  formError.value = '';
  fieldErrors.value = {};
  try {
    await auth.signIn(payload);
    await navigateTo('/dashboard');
  } catch (error) {
    handleAuthError(error, fieldErrors, formError);
  }
}
</script>
