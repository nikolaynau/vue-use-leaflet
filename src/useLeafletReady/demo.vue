<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletToggleLayer,
  useLeafletReady
} from 'vue-use-leaflet';

const created = ref(false);
const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletToggleLayer(map, tileLayer);

const ready = useLeafletReady(map, tileLayer);
</script>

<template>
  <div v-if="created" ref="element" style="height: 250px"></div>
  <button v-else @click="created = true">Create Map</button>
  <div>Ready: {{ ready }}</div>
</template>
