import { onMounted, ref, watch } from 'vue';

export function useFetch(apiUrl) {
  const data = ref(null);
  const isLoading = ref(false);
  const hasError = ref(false);

  const fetchData = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(apiUrl);
      data.value = await response.json();
    }
    catch (error) {
      console.error('Error fetching products:', error);
      hasError.value = true;
    }
    finally {
      isLoading.value = false;
    }
  };

  onMounted(async () => await fetchData());

  watch(data, (newVal, oldVal) => {
    console.log('HEY SOMETHING CHANGED', newVal, oldVal);
  }, {
    deep: true,
  });

  const reset = () => {
    data.value = null;
    isLoading.value = false;
    hasError.value = false;
  };

  const reFetch = () => fetchData();

  return {
    data,
    isLoading,
    hasError,
    reFetch,
    reset,
  };
}
