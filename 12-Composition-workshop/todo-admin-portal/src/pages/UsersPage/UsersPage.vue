<script setup>
import { useWindowScroll } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getPaginatedUsers } from '../../api/usersAPI';
import AppPagination from '../../components/AppPagination.vue';
import UsersTable from './components/UsersTable.vue';

const route = useRoute();
const { y } = useWindowScroll();
function scrollToTop() {
  y.value = 0;
}

const isLoading = ref(true);
const users = ref([]);
const total = ref(0);

async function loadData() {
  const page = Number(route.query.page ?? 1);
  const size = Number(route.query.size ?? 10);

  const qParams = {
    skip: (page - 1) * size,
    limit: size,
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
  <article class="usersPage">
    <h1>All users</h1>

    <UsersTable :is-loading="isLoading" :users="users" />

    <AppPagination :total="total" />
  </article>
</template>

<style scoped>
.usersPage{
  max-width: calc(1200px + 2 * 1rem);
  margin: 1rem auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}
</style>
