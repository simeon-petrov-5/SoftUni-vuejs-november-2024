import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

export function usePagination(refTotal = ref(PAGE_SIZE)) {
  const route = useRoute();
  const router = useRouter();

  function updatePage(page, size = PAGE_SIZE) {
    router.push({
      ...route,
      query: {
        ...(route.query ?? {}),
        page,
        size,
      },
    });
  }

  function getRouterLink(page, size = PAGE_SIZE) {
    return {
      ...route,
      query: {
        ...(route.query ?? {}),
        page,
        size,
      },
    };
  }

  const currentPage = computed(() => Number(route.query.page) || FIRST_PAGE);
  const currentPageSize = computed(() => Number(route.query.size) || PAGE_SIZE);

  const pageCount = computed(() => Math.ceil((refTotal.value / currentPageSize.value)));

  const isFirstPage = computed(() => currentPage.value === FIRST_PAGE);
  const isLastPage = computed(() => currentPage.value >= pageCount.value);

  const onPrev = () => {
    if (isFirstPage.value)
      return;
    updatePage(currentPage.value - 1, currentPageSize.value);
  };

  const onNext = () => {
    if (isLastPage.value)
      return;
    updatePage(currentPage.value + 1, currentPageSize.value);
  };

  return {
    currentPage,
    isFirstPage,
    isLastPage,
    pageCount,
    currentPageSize,
    onPrev,
    onNext,
    updatePage,
    getRouterLink,
  };
}
