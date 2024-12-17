import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCartStore = defineStore('cartStore', () => {
  const products = ref(new Map());

  function addToCart(product) {
    if (products.value.has(product.id)) {
      const prod = products.value.get(product.id);
      if (prod) {
        prod.quantity += 1;
      }
    }
    else {
      products.value.set(product.id, {
        id: product.id,
        quantity: 1,
      });
    }
  }

  function changeQuantity(productId, newQuantity) {
    const prod = products.value.get(productId);
    if (!prod)
      return;

    if (newQuantity > 0) {
      prod.quantity = newQuantity;
    }
    else {
      removeFromCart(productId);
    }
  }

  function removeFromCart(productId) {
    products.value.delete(productId);
  }

  return {
    products,
    addToCart,
    removeFromCart,
    changeQuantity,
  };
});
