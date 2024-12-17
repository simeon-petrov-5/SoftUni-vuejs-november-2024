<script setup>
import { storeToRefs } from 'pinia';
import { onUnmounted } from 'vue';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import ProductCard from './Product/components/ProductCard.vue';

const { favoriteProducts, isLoading } = storeToRefs(useFavoritesStore());
const { loadFavorites, resetProducts } = useFavoritesStore();

loadFavorites();

onUnmounted(() => resetProducts());
</script>

<template>
  <progress v-if="isLoading" />
  <div v-else-if="favoriteProducts.length > 0" class="products">
    <ProductCard v-for="prod in favoriteProducts" :key="prod.title + prod.id" :product="prod" />
  </div>
</template>

<style scoped>
.products {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>
