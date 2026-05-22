import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LandingPage from '../pages/index.vue';

describe('LandingPage', () => {
  it('renders the primary landing content and auth actions', () => {
    const wrapper = mount(LandingPage, {
      global: {
        stubs: {
          NuxtLink: {
            props: ['to'],
            template: '<a :href="to"><slot /></a>'
          }
        }
      }
    });

    expect(wrapper.text()).toContain('AI-DLC Email Auth POC');
    expect(wrapper.get('[data-testid="landing-hero-signup-link"]').attributes('href')).toBe('/auth/signup');
    expect(wrapper.get('[data-testid="landing-hero-signin-link"]').attributes('href')).toBe('/auth/signin');
    expect(wrapper.text()).toContain('/auth/verify-email');
    expect(wrapper.text()).toContain('/dashboard');
  });
});
