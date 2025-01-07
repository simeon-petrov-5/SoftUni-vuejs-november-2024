<script setup>
import { useWindowScroll } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPaginatedUsers } from '../../api/usersAPI';
import AppPagination from '../../components/AppPagination.vue';
import { usePagination } from '../../composables/usePagination';
import AdvancedUserTable from './components/AdvancedUserTable.vue';

const route = useRoute();
const { y } = useWindowScroll();
function scrollToTop() {
  y.value = 0;
}

const isLoading = ref(true);
const users = ref([]);
const total = ref(0);

const { currentPage, currentPageSize } = usePagination();

async function loadData() {
  const qParams = {
    skip: (currentPage.value - 1) * currentPageSize.value,
    limit: currentPageSize.value,
  };
  const res = await getPaginatedUsers(qParams);

  users.value = res.users;
  total.value = res.total;
  isLoading.value = false;
}

watch(() => route.query, () => {
  scrollToTop();
  loadData();
}, {
  deep: true,
  immediate: true,
});
</script>

<template>
  <div class="pageContainer">
    <PageLayout title="All users" background :is-loading="isLoading">
      <div class="tableWrapper">
        <AdvancedUserTable :users="users" />
      </div>
      <AppPagination :total="total" />
    </PageLayout>

    <router-view v-if="route.params.id" />
  </div>
</template>

<style scoped>
.pageContainer{
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
}

.tableWrapper{
 width: 100%;
 overflow-x: auto;
}
</style>
