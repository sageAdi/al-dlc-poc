<template>
  <p v-if="message" :id="id" class="auth-error" role="alert">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  message?: string;
}>();
</script>
