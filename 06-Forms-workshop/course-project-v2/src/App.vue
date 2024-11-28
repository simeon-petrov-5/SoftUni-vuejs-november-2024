<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import About from './pages/About.vue';
import Cart from './pages/Cart.vue';
import Contacts from './pages/Contacts.vue';
import Home from './pages/Home.vue';
import Products from './pages/Product/Products.vue';
import Register from './pages/Register/Register.vue';

export default {
  components: {
    AppFooter,
    AppHeader,
    Products,
    Home,
    Cart,
    Contacts,
    About,
    Register,
  },
  data() {
    return {
      page: 'Register',
    };
  },
  methods: {
    onSelect(newPage) {
      this.page = newPage;
    },
  },
};
</script>

<template>
  <AppHeader @select="onSelect" />
  <main>
    <component :is="page" />
  </main>
  <AppFooter />
</template>
