<script>
import { useCartStore } from '../../../stores/useCartStore';

export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
  },
  emits: ['delete'],
  setup() {
    return { cartStore: useCartStore() };
  },
  computed: {
    quantity() {
      return this.cartStore.products.get(this.product.id).quantity;
    },
    totalPrice() {
      const number = this.quantity * this.product.price;
      return Math.round((number + Number.EPSILON) * 100) / 100;
    },
  },
  methods: {
    onQuantityChange(event) {
      this.cartStore.changeQuantity(this.product.id, Number.parseInt(event.target.value, 10));
    },
  },
};
</script>

<template>
  <tr>
    <td>
      <div style="aspect-ratio: 1/1; width: 5rem; border-radius: 0.5rem; overflow: hidden;">
        <img
          style="object-fit: cover; width: 100%; height: 100%;" :src="product.images[0]"
          :alt="product.images.title"
        >
      </div>
    </td>
    <td>
      <p style="font-size: 1.25rem;">
        {{ product.images.title }}
      </p>
      <p style="font-size: 0.75rem;">
        Product price: {{ product.price }}$
      </p>
    </td>
    <td>
      <input type="number" min="0" :value="quantity" style="width: 5rem;" @change="onQuantityChange">
    </td>
    <td class="price">
      {{ totalPrice }}$
    </td>
    <td class="price">
      <button
        type="button"
        class="secondary outline"
        @click="$emit('delete')"
      >
        🗑️
      </button>
    </td>
  </tr>
</template>
