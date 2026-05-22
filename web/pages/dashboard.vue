<template>
  <main class="auth-page">
    <section class="mx-auto w-full max-w-3xl">
      <div class="auth-panel">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="auth-title">Dashboard</h1>
            <p class="auth-description">You are signed in as {{ auth.user.value?.email }}.</p>
          </div>
          <button class="auth-button sm:w-auto" data-testid="dashboard-signout-button" type="button" @click="auth.signOut">
            Sign out
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const auth = useAuth();
</script>
