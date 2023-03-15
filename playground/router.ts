/// <reference types="vite/client" />

import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('./Home.vue');
const MapDemo = () => import('../src/useLeafletMap/demo.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/map',
      component: MapDemo
    }
  ]
});

export default router;
