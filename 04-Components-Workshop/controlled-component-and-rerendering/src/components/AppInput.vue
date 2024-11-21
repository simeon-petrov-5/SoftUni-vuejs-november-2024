<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  emits: ['change'],
  methods: {
    onChange(event) {
      const text = event.target.value;
      this.$emit('change', text);
    },
    onReset() {
      this.$emit('change', '');
    },
  },
};
</script>

<template>
  <article class="appArticle">
    <input type="text" :value="value" @input="onChange">
    <button type="button" @click="onReset">
      Reset
    </button>
  </article>
</template>

<style scoped>
.appArticle {
  max-width: 400px;
  margin: 2rem;
  display: flex;

  gap: 1rem;

  input {
    border: lightblue solid 2px
  }
}
</style>
