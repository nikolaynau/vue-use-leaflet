<script setup lang="ts">
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { getDemoList } from './utils';

const items = reactive(getDemoList());
</script>

<template>
  <h1>Demo</h1>
  <ul>
    <li v-for="(item, i) of items" :key="i">
      <RouterLink :to="item.url">{{ item.title }}</RouterLink>
    </li>
  </ul>
</template>
