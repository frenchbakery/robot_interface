import { RouteRecordRaw } from 'vue-router';
import BatteryStatus from 'pages/BatteryStatus.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/battery',
        component: BatteryStatus,
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
