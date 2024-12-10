<script>
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';

export default {
  setup() {
    return { userStore: useUserStore(), cartStore: useCartStore() };
  },
  data() {
    return {
      links: [
        { name: 'home', label: 'Home' },
        { name: 'products', label: 'Products' },
        { name: 'about', label: 'About' },
        { name: 'contacts', label: 'Contacts' },
        { name: 'register', label: 'Register' },
        { name: 'favorites', label: 'Favorites' },
        { name: 'login', label: 'Login' },
      ],
    };
  },
  computed: {
    userName() {
      return this.userStore.user?.username ?? '';
    },
    cartLength() {
      return this.cartStore.products.size;
    },
  },
  async created() {
    await this.userStore.reAuthUser();
  },
  methods: {
    onCartClick() {
      this.$router.push({
        name: 'cart',
      });
    },
  },
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Q0hUaUi7lLLC5UOslM9ul_B8NyXTKNn9BcBGtCXV&s"
            alt="logo"
          >
        </li>
      </ul>
      <ul>
        <li v-for="link in links" :key="link.path">
          <router-link :to="{ name: link.name }">
            {{ link.label }}
          </router-link>
        </li>
        <li>
          <button type="button" class="primary" @click="onCartClick">
            Cart <span v-if="cartLength">{{ cartLength }}</span>
          </button>
        </li>

        <li>
          <button type="button" class="outline">
            {{ userName }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
nav {
  padding: 0.25rem 1rem;
}

nav img {
  height: 2rem;
}
</style>
