<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletToggleLayer
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletToggleLayer(map, tileLayer);
</script>

<template>
  <div ref="element" style="height: 250px"></div>
</template>
