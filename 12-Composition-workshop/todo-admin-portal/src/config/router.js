import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import UsersPage from '../pages/UsersPage/UsersPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersPage,
    beforeEnter: (to) => {
      const query = {};
      if (!to.query.page)
        query.page = 1;
      if (!to.query.size)
        query.size = 10;
      if (Object.keys(query).length) {
        return {
          ...to,
          query: {
            ...to.query,
            ...query,
          },
        };
      }
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
