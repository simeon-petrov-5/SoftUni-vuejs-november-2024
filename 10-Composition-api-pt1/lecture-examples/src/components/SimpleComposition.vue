<script setup>
import { computed, reactive, ref, watch } from 'vue';

const props = defineProps({
  initialCount: {
    type: Number,
    required: false,
    default: 0,
  },
});

const emit = defineEmits(['increment']);

const countState = ref(props.initialCount);
console.log('state example', countState);
function incrementCount() {
  countState.value += 1;
  emit('increment', countState.value);
}
const doubledCount = computed(() => {
  return countState.value * 2;
});

watch(countState, (newValue, oldValue) => {
  console.log('WATCHER', newValue, oldValue);
});

const deepStateRef = ref({
  lets: {
    have: {
      very: {
        nested: {
          number: {
            here: 0,
          },
        },
      },
    },
  },
});

const deepStateReactive = reactive({
  lets: {
    have: {
      very: {
        nested: {
          number: {
            here: 0,
          },
        },
      },
    },
  },
});

function doSomethingWithState() {
  deepStateRef.value.lets.have.very.nested.number.here += 1;
  // deepStateRef.value = {
  //   lets: {
  //     have: {
  //       very: {
  //         nested: {
  //           number: {
  //             here: deepStateRef.value.lets.have.very.nested.number.here + 1,
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  //   deepStateReactive.lets.have.very.nested.number.here = 20;
  //   const { nested: nReactive } = deepStateReactive.lets.have.very;
  //   nReactive.number = { here: 200 };

  deepStateReactive.lets = {
    have: {
      very: {
        nested: {
          number: {
            here: deepStateReactive.lets.have.very.nested.number.here + 1,
          },
        },
      },
    },
  };
}

watch(() => deepStateRef.value.lets.have.very.nested.number.here, (newValue, oldValue) => {
  console.log('🎄 WATCHER 🎄', newValue, oldValue);
});
</script>

<template>
  <h1>COMPOSITION API</h1>
  <button type="button" class="outline" @click="incrementCount">
    Example {{ countState }} | {{ doubledCount }}
  </button>

  <h2>Deep & reactive examples</h2>
  <h3>REF: {{ deepStateRef.lets.have.very.nested.number.here }}</h3>
  <h3>Reactive: {{ deepStateReactive.lets.have.very.nested.number.here }}</h3>
  <button @click="doSomethingWithState">
    Do something
  </button>
</template>
