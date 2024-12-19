<script setup>
import { ref } from 'vue';
import { getAllTodos } from '../api/todosAPI';
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
  <h1>Login</h1>

  <progress v-if="isLoading" />
  <TodoChart v-else-if="allTodos.length" :items="allTodos" />
</template>
