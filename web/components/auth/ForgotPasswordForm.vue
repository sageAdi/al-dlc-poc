<template>
  <form class="auth-form" data-testid="forgot-password-form" @submit.prevent="submit">
    <div class="auth-field">
      <label class="auth-label" for="forgot-email">Email</label>
      <input
        id="forgot-email"
        v-model="email"
        class="auth-input"
        data-testid="forgot-password-form-email-input"
        type="email"
        autocomplete="email"
        :aria-invalid="Boolean(errors.email)"
        aria-describedby="forgot-email-error"
      />
      <FieldError id="forgot-email-error" :message="errors.email" />
    </div>
    <button class="auth-button" data-testid="forgot-password-form-submit-button" type="submit" :disabled="pending">
      {{ pending ? 'Sending...' : 'Send reset instructions' }}
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
  submit: [payload: { email: string }];
}>();

const email = ref('');
const localErrors = ref<Record<string, string>>({});
const errors = computed(() => ({ ...localErrors.value, ...(props.fieldErrors || {}) }));

function submit() {
  localErrors.value = {};
  if (!email.value) localErrors.value.email = 'Email is required.';
  if (Object.keys(localErrors.value).length) return;
  emit('submit', { email: email.value });
}
</script>
