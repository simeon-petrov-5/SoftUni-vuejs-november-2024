<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
  },
};
</script>

<template>
  <Suspense>
    <AppHeader />

    <template #fallback>
      <h1>HEY I'M LOADING GIMME A SEC</h1>
    </template>
  </Suspense>
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>
