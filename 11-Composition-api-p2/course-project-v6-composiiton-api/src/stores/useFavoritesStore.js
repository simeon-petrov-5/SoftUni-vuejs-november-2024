import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { getProductsByIds } from '../services/productsServices';

export const useFavoritesStore = defineStore('favouritesStore', () => {
  const favorites = ref(new Set([]));
  const products = ref([]);
  const isLoading = ref(false);

  const favoriteProducts = computed(() => products.value.filter(prod => favorites.value.has(prod.id)));

  function isFavourite(id) {
    return favorites.value.has(id);
  }

  function toggleFavorite(id) {
    const isFavorite = this.isFavourite(id);
    if (isFavorite) {
      favorites.value.delete(id);
    }
    else {
      favorites.value.add(id);
    }
  }

  async function loadFavorites() {
    isLoading.value = true;

    const response = await getProductsByIds(Array.from(favorites.value));

    products.value = response;
    isLoading.value = false;
  };

  function resetProducts() {
    products.value = [];
  }

  return {
    isLoading,
    favoriteProducts,
    isFavourite,
    toggleFavorite,
    loadFavorites,
    resetProducts,
  };
});

// export const useFavoritesStore = defineStore('favouritesStore', {
//   state: () => ({
//     favorites: new Set([]),
//     products: [],
//     isLoading: false,
//   }),
//   getters: {
//     favoriteProducts: state => state.products.filter(prod => state.favorites.has(prod.id)),
//   },
//   actions: {
//     isFavourite(id) {
//       return this.favorites.has(id);
//     },
//     toggleFavorite(id) {
//       const isFavorite = this.isFavourite(id);
//       if (isFavorite) {
//         this.favorites.delete(id);
//       }
//       else {
//         this.favorites.add(id);
//       }
//     },
//     async loadFavorites() {
//       this.isLoading = true;
//       const response = await getProductsByIds(Array.from(this.favorites));
//       this.products = response;
//       this.isLoading = false;
//     },
//     resetProducts() {
//       this.products = [];
//     },
//   },
// });
