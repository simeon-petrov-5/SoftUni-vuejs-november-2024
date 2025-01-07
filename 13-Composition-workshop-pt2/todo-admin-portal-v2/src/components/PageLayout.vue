<script setup>
import AppSpinner from '../components/AppSpinner.vue';

defineProps({
  title: {
    type: String,
  },
  isLoading: {
    type: Boolean,
  },
  background: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="pageLayout">
    <slot name="title">
      <h1 style="margin-bottom: 2rem;">
        {{ title }}
      </h1>
    </slot>

    <div :class="{ background }">
      <div v-if="isLoading" class="spinnerContainer">
        <AppSpinner />
      </div>
      <slot v-else />
    </div>
  </div>
</template>

<style scoped>
.pageLayout {
    max-width: calc(1200px + 2 * 1rem);
    margin: 1rem auto;
    padding: 1rem;
}

.spinnerContainer {
    height: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.background {
    padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);
    border-radius: var(--pico-border-radius);
    background: var(--pico-card-background-color);
    box-shadow: var(--pico-card-box-shadow);
}
</style>
