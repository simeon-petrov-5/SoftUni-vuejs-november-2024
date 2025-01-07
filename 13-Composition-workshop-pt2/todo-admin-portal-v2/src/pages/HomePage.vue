<script setup>
import { ref } from 'vue';
import { getAllTodos } from '../api/todosAPI';
import PageLayout from '../components/PageLayout.vue';
import TodoChart from '../components/TodoChart.vue';

const isLoading = ref(true);
const allTodos = ref([]);

async function loadData() {
  allTodos.value = await getAllTodos();
  isLoading.value = false;
}

loadData();
</script>

<template>
  <PageLayout title="Home page" :is-loading="isLoading">
    <section class="homeGrid">
      <TodoChart v-if="allTodos.length" class="todoChart" :items="allTodos" />
      <article>
        <h2>Widget 2</h2>
        <ul>
          <li>Lorem </li>
          <li>ipsum</li>
          <li>dolor</li>
          <li>sit</li>
        </ul>
      </article>

      <article>
        <h2>Widget 3</h2>
        <ul>
          <li>Lorem </li>
          <li>ipsum</li>
          <li>dolor</li>
          <li>sit</li>
        </ul>
      </article>
    </section>
  </PageLayout>
</template>

<style scoped>
.homeGrid {
  display: grid;
  grid-template-columns: minmax(100px, 1fr);
  gap: 1rem;
}

@media screen and (min-width:768px) {
  .homeGrid {
    grid-template-columns: repeat(2, minmax(100px, 1fr))
  }

  .todoChart {
    grid-column: 1 / span 2;
  }
}
</style>
