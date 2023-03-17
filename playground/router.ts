/// <reference types="vite/client" />

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw
} from 'vue-router';
import { getDemoList } from './utils';

const Home = () => import('./Home.vue');

const demoRoutes: RouteRecordRaw[] = getDemoList().map(
  item =>
    <RouteRecordRaw>{
      path: item.url,
      name: item.title,
      component: item.component
    }
);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...demoRoutes
  ]
});

export default router;
