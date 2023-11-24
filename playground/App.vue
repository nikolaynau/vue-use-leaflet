<script setup lang="ts">
import { RouterView } from 'vue-router';
import { setDefaultPrefix } from './utils';

setDefaultPrefix();
</script>

<template>
  <RouterView />
</template>

<style>
@import 'assets/css/style.css';
</style>
