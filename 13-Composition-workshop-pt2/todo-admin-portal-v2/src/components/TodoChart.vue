<script setup>
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { ref, watch } from 'vue';
import { Pie } from 'vue-chartjs';

const props = defineProps({
  items: {
    required: true,
    type: Array,
  },
});

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: ['Open', 'Done'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651'],
      data: [0, 0],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

function generateStats(todos) {
  let open = 0;
  let done = 0;
  todos.forEach((todo) => {
    if (todo.completed) {
      done += 1;
    }
    else {
      open += 1;
    }
  });

  chartData.value.datasets[0].data = [open, done];
}

watch(() => props.items, (newVal) => {
  generateStats(newVal);
}, {
  immediate: true,
});
</script>

<template>
  <article>
    <div class="text">
      <h2>Todo items statistics</h2>
      <ul>
        <li>Total amount: {{ items.length }}</li>
        <li>Open items: {{ chartData.datasets[0].data[0] }}</li>
        <li>Done items: {{ chartData.datasets[0].data[1] }}</li>
      </ul>
    </div>

    <div class="chartWrapper">
      <Pie :options="chartOptions" :data="chartData" />
    </div>
    <div class="chartWrapper">
      <Pie :options="chartOptions" :data="chartData" />
    </div>
  </article>
</template>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.chartWrapper{
  aspect-ratio: 1/1;
  max-height: 260px;
  display: flex;
  justify-content: center;
  flex-grow: 1;
}

@media screen and (min-width:768px) {
  article{
    flex-direction: row;
    flex-wrap: wrap;
  }
 .text{
  flex-shrink: 0;;
 }
}
</style>
