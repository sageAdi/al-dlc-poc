<template>
  <form class="auth-form" data-testid="signin-form" @submit.prevent="submit">
    <div class="auth-field">
      <label class="auth-label" for="signin-email">Email</label>
      <input
        id="signin-email"
        v-model="email"
        class="auth-input"
        data-testid="signin-form-email-input"
        type="email"
        autocomplete="email"
        :aria-invalid="Boolean(errors.email)"
        aria-describedby="signin-email-error"
      />
      <FieldError id="signin-email-error" :message="errors.email" />
    </div>
    <div class="auth-field">
      <label class="auth-label" for="signin-password">Password</label>
      <input
        id="signin-password"
        v-model="password"
        class="auth-input"
        data-testid="signin-form-password-input"
        type="password"
        autocomplete="current-password"
        :aria-invalid="Boolean(errors.password)"
        aria-describedby="signin-password-error"
      />
      <FieldError id="signin-password-error" :message="errors.password" />
    </div>
    <button class="auth-button" data-testid="signin-form-submit-button" type="submit" :disabled="pending">
      {{ pending ? 'Signing in...' : 'Sign in' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import FieldError from './FieldError.vue';

const props = defineProps<{
  pending?: boolean;
  fieldErrors?: Record<string, string>;
}>();

const emit = defineEmits<{
  submit: [payload: { email: string; password: string }];
}>();

const email = ref('');
const password = ref('');
const localErrors = ref<Record<string, string>>({});
const errors = computed(() => ({ ...localErrors.value, ...(props.fieldErrors || {}) }));

function submit() {
  localErrors.value = {};
  if (!email.value) localErrors.value.email = 'Email is required.';
  if (!password.value) localErrors.value.password = 'Password is required.';
  if (Object.keys(localErrors.value).length) return;
  emit('submit', { email: email.value, password: password.value });
}
</script>
