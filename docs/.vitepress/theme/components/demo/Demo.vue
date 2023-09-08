<script setup lang="ts">
/// <reference types="vite/client" />

import { ref, computed } from 'vue';
import LoadPanel from './LoadPanel.vue';

export interface Props {
  name?: string;
  sourceUrl?: string;
}

const props = defineProps<Props>();

const loading = ref(true);
const frame = ref<HTMLIFrameElement | null>(null);
const frameUrl = computed(() =>
  props.name ? `${getBaseUrl()}#/${props.name}` : undefined
);

function onLoad() {
  loading.value = false;

  try {
    const frameDoc =
      frame.value?.contentDocument || frame.value?.contentWindow?.document;
    if (frameDoc && frameDoc.documentElement) {
      frameDoc.documentElement.classList.add('dark');
    }
  } catch (e) {
    console.error(e);
  }
}

function getBaseUrl(): string {
  return import.meta.env.MODE === 'development'
    ? `http://localhost:5174/playground/`
    : `/playground/`;
}
</script>

<template>
  <div class="demo">
    <div v-if="frameUrl" class="demo-display">
      <LoadPanel v-if="loading" />
      <div class="demo-frame-container">
        <iframe
          ref="frame"
          class="demo-frame"
          loading="lazy"
          :src="frameUrl"
          @load="onLoad"
        ></iframe>
      </div>
      <div v-if="!loading && sourceUrl" class="demo-source-link">
        <a :href="sourceUrl" target="_blank">source</a>
      </div>
    </div>
  </div>
</template>

<style>
@import 'demo';
</style>
