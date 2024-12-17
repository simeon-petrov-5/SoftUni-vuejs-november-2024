<script setup>
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';
</script>

<template>
  <AppHeader />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>
