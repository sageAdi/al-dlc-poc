import { AuthApiError } from './auth-client';
import type { Ref } from 'vue';

export function handleAuthError(
  error: unknown,
  fieldErrors: Ref<Record<string, string>>,
  formError: Ref<string>
) {
  if (error instanceof AuthApiError) {
    fieldErrors.value = Object.fromEntries(error.fields.map((field) => [field.field, field.message]));
    formError.value = error.fields.length ? '' : error.message;
    return;
  }

  formError.value = 'The request could not be completed.';
}
