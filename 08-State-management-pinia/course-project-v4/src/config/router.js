import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Cart from '../pages/Cart.vue';
import Contacts from '../pages/Contacts.vue';
import Favorites from '../pages/Favorites.vue';
import Home from '../pages/Home.vue';
import NotFound from '../pages/NotFound.vue';
import Products from '../pages/Product/Products.vue';
import SingleProduct from '../pages/Product/SingleProduct.vue';
import Register from '../pages/Register/Register.vue';
import User from '../pages/User/User.vue';
import UserDetails from '../pages/User/UserDetails.vue';
import UserEdit from '../pages/User/UserEdit.vue';
// import UserHome from '../pages/User/UserHome.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/products', name: 'products', component: Products },
  { path: '/about', name: 'about', component: About },
  { path: '/contacts', name: 'contacts', component: Contacts },
  { path: '/register', name: 'register', component: Register },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/product', name: 'singleProduct', component: SingleProduct },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    beforeEnter: (to, from) => {
      console.log('Going into favorites', to, from);
    },
  },

  {
    path: '/user',
    component: User,
    children: [
      { path: 'edit', redirect: { name: 'home' } },
      { path: ':id', component: UserDetails },
      { path: ':id/edit', component: UserEdit },
    ],
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from) => {
  console.log('Before the routing', to, from);
});

router.afterEach((to, from) => {
  console.log('AFTER the routing', to, from);
});

export default router;
