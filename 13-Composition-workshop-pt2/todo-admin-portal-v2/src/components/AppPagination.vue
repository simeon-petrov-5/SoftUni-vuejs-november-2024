<script setup>
import { toRefs } from 'vue';
import { usePagination } from '../composables/usePagination';

const props = defineProps({
  total: {
    required: true,
    type: Number,
  },
});

const { total } = toRefs(props);
const { currentPage, isFirstPage, pageCount, isLastPage, onNext, onPrev, getRouterLink } = usePagination(total);
</script>

<template>
  <div class="pagination">
    <button :disabled="isFirstPage" @click="onPrev">
      prev
    </button>

    <router-link v-for="page in pageCount" :key="`page-${page}`" :to="getRouterLink(page)">
      <button
        :disabled="currentPage === page"
      >
        {{ page }}
      </button>
    </router-link>

    <button :disabled="isLastPage" @click="onNext">
      next
    </button>
  </div>
</template>

<style scoped>
.pagination{
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
</style>
