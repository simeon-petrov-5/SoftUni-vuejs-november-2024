<script>
import { categories } from '../../../constants/categories';

export default {
  props: {
    active: {
      type: String,
      required: true,
    },
  },
  emits: ['select'],
  data() {
    return { categories };
  },
};
</script>

<template>
  <ul role="list" class="categories">
    <li v-for="category in categories" :key="`category-btn-${category.value}`">
      <button
        :class="[category.value === active ? 'primary' : 'secondary outline']"
        @click="$emit('select', category.value)"
      >
        {{ category.name }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.categories {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
