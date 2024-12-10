<script>
import AppFooter from './AppFooter.vue';
import AppHeader from './AppHeader.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
  },
};
</script>

<template>
  <AppHeader />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>
