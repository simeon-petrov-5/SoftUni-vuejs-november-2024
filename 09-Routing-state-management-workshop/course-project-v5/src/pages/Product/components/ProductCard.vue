<script>
import { useCartStore } from '../../../stores/useCartStore';
import { useFavoritesStore } from '../../../stores/useFavoritesStore';
import { useUserStore } from '../../../stores/useUserStore';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return { favoritesStore: useFavoritesStore(), userStore: useUserStore(), cartStore: useCartStore() };
  },
  computed: {
    isFavorite() {
      return this.favoritesStore.isFavourite(this.product.id);
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
      <button type="button" class="secondary outline" @click="cartStore.addToCart(product)">
        Add to cart 🛒
      </button>

      <button
        v-if="userStore.isUserLogged" type="button" class="contrast" :class="[isFavorite ? '' : 'outline']"
        @click="favoritesStore.toggleFavorite(product.id)"
      >
        Favourite {{ isFavorite ? '💙' : '🤍' }}
      </button>
    </footer>
  </article>
</template>
