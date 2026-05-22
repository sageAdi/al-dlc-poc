<template>
  <main class="min-h-screen bg-slate-50 text-slate-950">
    <section class="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <header class="flex items-center justify-between border-b border-slate-200 pb-4">
        <NuxtLink class="text-sm font-semibold text-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-400" data-testid="landing-brand-link" to="/">
          AI-DLC Auth
        </NuxtLink>
        <nav class="flex items-center gap-3" aria-label="Primary navigation">
          <NuxtLink class="auth-link" data-testid="landing-nav-signin-link" to="/auth/signin">Sign in</NuxtLink>
          <NuxtLink class="inline-flex items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2" data-testid="landing-nav-signup-link" to="/auth/signup">
            Create account
          </NuxtLink>
        </nav>
      </header>

      <div class="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <section class="max-w-2xl">
          <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700">Email authentication proof of concept</p>
          <h1 class="mt-4 text-4xl font-semibold tracking-normal text-slate-950 sm:text-5xl">AI-DLC Email Auth POC</h1>
          <p class="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            A Nuxt and NestJS authentication flow with verified sign-up, HTTP-only cookie sessions, password recovery, and a protected dashboard.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <NuxtLink class="auth-button sm:w-auto" data-testid="landing-hero-signup-link" to="/auth/signup">Create account</NuxtLink>
            <NuxtLink class="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2" data-testid="landing-hero-signin-link" to="/auth/signin">
              Sign in
            </NuxtLink>
          </div>

          <dl class="mt-10 grid gap-4 sm:grid-cols-3">
            <div class="border-l-4 border-emerald-500 bg-white px-4 py-3 shadow-sm">
              <dt class="text-sm font-medium text-slate-600">Frontend</dt>
              <dd class="mt-1 text-base font-semibold text-slate-950">Nuxt 3</dd>
            </div>
            <div class="border-l-4 border-amber-500 bg-white px-4 py-3 shadow-sm">
              <dt class="text-sm font-medium text-slate-600">Backend</dt>
              <dd class="mt-1 text-base font-semibold text-slate-950">NestJS</dd>
            </div>
            <div class="border-l-4 border-sky-500 bg-white px-4 py-3 shadow-sm">
              <dt class="text-sm font-medium text-slate-600">Storage</dt>
              <dd class="mt-1 text-base font-semibold text-slate-950">PostgreSQL</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" aria-label="Authentication flow summary">
          <div class="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 class="text-lg font-semibold text-slate-950">Auth Flow</h2>
              <p class="mt-1 text-sm text-slate-600">Routes wired for the current UI</p>
            </div>
            <span class="rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">Ready</span>
          </div>

          <ol class="mt-5 space-y-3">
            <li v-for="step in flowSteps" :key="step.route" class="flex gap-3 rounded-md border border-slate-200 p-3">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-950 text-sm font-semibold text-white">{{ step.number }}</span>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-slate-950">{{ step.label }}</p>
                <p class="mt-1 break-words text-sm text-slate-600">{{ step.route }}</p>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const flowSteps = [
  { number: '1', label: 'Create account', route: '/auth/signup' },
  { number: '2', label: 'Verify email', route: '/auth/verify-email' },
  { number: '3', label: 'Sign in', route: '/auth/signin' },
  { number: '4', label: 'Open dashboard', route: '/dashboard' }
];
</script>
