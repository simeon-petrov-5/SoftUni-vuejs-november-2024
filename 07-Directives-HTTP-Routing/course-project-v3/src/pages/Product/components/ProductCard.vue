<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <article>
    <img :src="product.images[0]" :alt="product.title">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p><b>Price</b>: {{ product.price }}$</p>
    <footer>
      <button class="secondary outline">
        Add to cart 🛒
      </button>
    </footer>
  </article>
</template>
