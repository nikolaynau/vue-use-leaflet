<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletReady
} from 'vue-use-leaflet';

const created = ref(false);
const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const ready = useLeafletReady(map, tileLayer);
</script>

<template>
  <div v-if="created" ref="el" style="height: 250px"></div>
  <button v-else @click="created = true">Create Map</button>
  <div>Ready: {{ ready }}</div>
</template>
