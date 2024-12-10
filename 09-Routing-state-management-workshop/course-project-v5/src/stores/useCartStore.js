import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state() {
    return {
      products: new Map(),
    };
  },
  actions: {
    addToCart(product) {
      if (this.products.has(product.id)) {
        const prod = this.products.get(product.id);
        if (prod) {
          prod.quantity += 1;
        }
      }
      else {
        this.products.set(product.id, {
          id: product.id,
          quantity: 1,
        });
      }
    },
    changeQuantity(productId, newQuantity) {
      const prod = this.products.get(productId);
      if (!prod)
        return;

      if (newQuantity > 0) {
        prod.quantity = newQuantity;
      }
      else {
        this.removeFromCart(productId);
      }
    },
    removeFromCart(productId) {
      this.products.delete(productId);
    },
  },
});
