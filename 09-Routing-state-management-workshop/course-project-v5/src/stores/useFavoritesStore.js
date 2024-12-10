import { defineStore } from 'pinia';
import { getProductsByIds } from '../services/productsServices';

export const useFavoritesStore = defineStore('favouritesStore', {
  state: () => ({
    favorites: new Set([]),
    products: [],
    isLoading: false,
  }),
  getters: {
    favoriteProducts: state => state.products.filter(prod => state.favorites.has(prod.id)),
  },
  actions: {
    isFavourite(id) {
      return this.favorites.has(id);
    },
    toggleFavorite(id) {
      const isFavorite = this.isFavourite(id);
      if (isFavorite) {
        this.favorites.delete(id);
      }
      else {
        this.favorites.add(id);
      }
    },
    async loadFavorites() {
      this.isLoading = true;
      const response = await getProductsByIds(Array.from(this.favorites));
      this.products = response;
      this.isLoading = false;
    },
    resetProducts() {
      this.products = [];
    },
  },
});
