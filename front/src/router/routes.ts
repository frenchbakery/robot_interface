import { RouteRecordRaw } from 'vue-router';
import BatteryStatus from 'pages/BatteryStatus.vue';
import ServoPage from 'pages/ServoPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'battery',
        path: '/battery/:id?',
        component: BatteryStatus,
      },
      {
        name: 'servo',
        path: '/servo/:id?',
        component: ServoPage,
      },
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
