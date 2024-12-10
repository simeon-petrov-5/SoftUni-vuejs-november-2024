<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<template>
  <h1>SINGLE PRODUCT {{ id }} {{ $route.params.id }}</h1>
</template>
