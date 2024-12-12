<script>
import { onMounted, ref } from 'vue';
import { useFetch } from '../composables/useFetch';

export default {
  setup() {
    const exampleReactiveState = ref('some example here');

    // EXAMPLE WITH COMPOSABLE & USERS
    const { data, isLoading, hasError } = useFetch('https://dummyjson.com/users');

    onMounted(() => {
      console.log('COMPOSITION onMounted');
    });

    return { data, isLoading, hasError, exampleReactiveState };
  },
  data() {
    return {
      products: [],
      selectedProducts: [],
      isDropdownOpen: false,
      loading: true,
      searchTerm: '',
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()),
      );
    },
    selectedProductDetails() {
      return this.products.filter(product =>
        this.selectedProducts.includes(product.id),
      );
    },
  },
  // created() {
  //   this.fetchProducts();
  // },
  mounted() {
    console.log('OPTIONS mounted');
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      try {
        const response = await fetch('https://dummyjson.com/products?limit=20');
        const data = await response.json();
        this.products = data.products;
        this.loading = false;
      }
      catch (error) {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    removeProduct(productId) {
      this.selectedProducts = this.selectedProducts.filter(id => id !== productId);
    },
  },
};
</script>

<template>
  <section>
    <div class="product-selector">
      <h2 class="selector-title">
        Select Products - OPTIONS API
      </h2>

      <div class="dropdown-container">
        <button class="dropdown-button" @click="toggleDropdown">
          <span class="dropdown-button-text">
            {{ selectedProducts.length > 0
              ? `${selectedProducts.length} product(s) selected`
              : 'Select Products'
            }}
          </span>
          <span class="dropdown-icon" :class="{ 'icon-rotated': isDropdownOpen }">
            🔻
          </span>
        </button>

        <div v-if="isDropdownOpen" class="dropdown-menu">
          <div class="search-container">
            <input v-model="searchTerm" placeholder="Search products..." class="search-input">
          </div>

          <div v-if="loading" class="loading-message">
            Loading products...
          </div>

          <div v-else-if="filteredProducts.length === 0" class="no-products-message">
            No products found
          </div>

          <div v-else class="products-list">
            <label v-for="product in filteredProducts" :key="product.id" class="product-item">
              <input v-model="selectedProducts" type="checkbox" :value="product.id" class="product-checkbox">
              <img :src="product.thumbnail" :alt="product.title" class="product-thumbnail">
              <span class="product-title">{{ product.title }}</span>
            </label>
          </div>
        </div>
      </div>

      <div v-if="selectedProducts.length > 0" class="selected-products">
        <h3 class="selected-title">
          Selected Products:
        </h3>
        <div class="selected-products-list">
          <span v-for="product in selectedProductDetails" :key="product.id" class="selected-product-tag">
            {{ product.title }}
            <button class="remove-product-button" @click="removeProduct(product.id)">
              ×
            </button>
          </span>
        </div>
      </div>
    </div>

    <input v-model="exampleReactiveState" type="text">

    <progress v-if="isLoading" />
    <p v-if="hasError">
      Something failed
    </p>
    <ul v-if="data">
      <li v-for="user in data.users" :key="user.id">
        {{ user.firstName }} {{ user.lastName }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.dropdown-button-text {
  color: red;
}

.product-selector {
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}

.selector-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.dropdown-container {
  position: relative;
  width: 100%;
}

.dropdown-button {
  width: 100%;
  text-align: left;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.dropdown-button-text {
  flex-grow: 1;
}

.dropdown-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
}

.icon-rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-top: 0.25rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-container {
  padding: 0.5rem;
  position: sticky;
  top: 0;
  background-color: white;
}

.search-input {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #ccc;
}

.loading-message,
.no-products-message {
  padding: 1rem;
  text-align: center;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
}

.product-item:hover {
  background-color: #f4f4f4;
}

.product-checkbox {
  margin-right: 0.5rem;
}

.product-thumbnail {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
  margin-right: 0.5rem;
}

.product-title {
  flex-grow: 1;
}

.selected-products {
  margin-top: 1rem;
}

.selected-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.selected-products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.selected-product-tag {
  background-color: #e6f2ff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
}

.remove-product-button {
  margin-left: 0.5rem;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
