<template>
  <form class="auth-form" data-testid="reset-password-form" @submit.prevent="submit">
    <div class="auth-field">
      <label class="auth-label" for="reset-password">New password</label>
      <input
        id="reset-password"
        v-model="password"
        class="auth-input"
        data-testid="reset-password-form-password-input"
        type="password"
        autocomplete="new-password"
        :aria-invalid="Boolean(errors.password)"
        aria-describedby="reset-password-error"
      />
      <FieldError id="reset-password-error" :message="errors.password" />
    </div>
    <button class="auth-button" data-testid="reset-password-form-submit-button" type="submit" :disabled="pending">
      {{ pending ? 'Resetting...' : 'Reset password' }}
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
  submit: [payload: { password: string }];
}>();

const password = ref('');
const localErrors = ref<Record<string, string>>({});
const errors = computed(() => ({ ...localErrors.value, ...(props.fieldErrors || {}) }));

function submit() {
  localErrors.value = {};
  if (!password.value) localErrors.value.password = 'Password is required.';
  if (password.value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/.test(password.value)) {
    localErrors.value.password = 'Password must be at least 10 characters and include uppercase, lowercase, number, and symbol.';
  }
  if (Object.keys(localErrors.value).length) return;
  emit('submit', { password: password.value });
}
</script>
