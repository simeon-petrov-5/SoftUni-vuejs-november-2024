import { createRouter, createWebHistory } from 'vue-router';
import AdvancedUserPage from '../pages/AdvancedUserPage/AdvancedUserPage.vue';
import AdvancedDetails from '../pages/AdvancedUserPage/components/AdvancedDetails.vue';
import HomePage from '../pages/HomePage.vue';
import UserDetailsPage from '../pages/UserDetailsPage.vue';
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
  {
    path: '/user-details/:id',
    name: 'userDetails',
    component: UserDetailsPage,
  },

  {
    path: '/advanced-users',
    name: 'advancedUsers',
    component: AdvancedUserPage,
    children: [
      {
        path: ':id',
        component: AdvancedDetails,
        name: 'advancedDetails',
      },
    ],
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
