<script setup>
import { useOffsetPagination } from '@vueuse/core';
import { onMounted, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  total: {
    required: true,
    type: Number,
  },
});

const { total } = toRefs(props);

const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

const router = useRouter();
const route = useRoute();

const {
  currentPage,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total,
  page: FIRST_PAGE,
  pageSize: PAGE_SIZE,
  onPageChange: updateRoute,
  onPageSizeChange: updateRoute,
});

function updateRoute({ currentPage, currentPageSize }) {
  router.push({
    ...route,
    query: {
      ...(route.query ?? {}),
      page: currentPage,
      size: currentPageSize,
    },
  });
}

onMounted(() => {
  currentPage.value = Number.parseInt(route.query.page, 10);
});
</script>

<template>
  <div class="pagination">
    <button :disabled="isFirstPage" @click="prev">
      prev
    </button>

    <button
      v-for="page in pageCount" :key="`page-${page}`" :disabled="currentPage === page"
      @click="currentPage = page"
    >
      {{ page }}
    </button>

    <button :disabled="isLastPage" @click="next">
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
