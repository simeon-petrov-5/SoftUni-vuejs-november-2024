<script>
import { getAllCategories } from '../../../services/categoriesServices';

export default {
  props: {
    active: {
      type: String,
      required: true,
    },
  },
  emits: ['select'],
  data() {
    return {
      isLoading: true,
      categories: [],
    };
  },
  async created() {
    this.categories = await getAllCategories();
    this.isLoading = false;
  },
};
</script>

<template>
  <progress v-if="isLoading" />
  <ul v-else-if="categories.length > 0" role="list" class="categories">
    <li v-for="category in categories" :key="`category-btn-${category.slug}`">
      <button
        :class="[category.slug === active ? 'primary' : 'secondary outline']"
        @click="$emit('select', category.slug)"
      >
        {{ category.name }}
      </button>
    </li>
  </ul>
</template>

<style scoped>
.categories {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem 2rem;
}
</style>
