import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SignUpForm from '../components/auth/SignUpForm.vue';

describe('SignUpForm', () => {
  it('renders accessible inputs and submit button', () => {
    const wrapper = mount(SignUpForm);

    expect(wrapper.get('[data-testid="signup-form-email-input"]').attributes('aria-describedby')).toBe('signup-email-error');
    expect(wrapper.get('[data-testid="signup-form-password-input"]').attributes('aria-describedby')).toBe('signup-password-error');
    expect(wrapper.get('[data-testid="signup-form-submit-button"]').text()).toBe('Create account');
  });

  it('emits submit for valid input', async () => {
    const wrapper = mount(SignUpForm);

    await wrapper.get('[data-testid="signup-form-email-input"]').setValue('user@example.com');
    await wrapper.get('[data-testid="signup-form-password-input"]').setValue('Password1!');
    await wrapper.get('[data-testid="signup-form"]').trigger('submit');

    expect(wrapper.emitted('submit')?.[0]).toEqual([{ email: 'user@example.com', password: 'Password1!' }]);
  });
});
