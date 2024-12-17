<script>
export default {
  props: {
    gap: {
      type: String,
      default: '1rem',
      validator: value => typeof value === 'string' && value.includes('rem'),
    },
  },
};
</script>

<template>
  <div>
    <slot />
  </div>
</template>

<style scoped>
div {
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: v-bind(gap);
}
</style>
