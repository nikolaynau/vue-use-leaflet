<script setup lang="ts">
import { ref } from 'vue';
import type { LatLng, LeafletEvent, Map } from 'leaflet';
import {
  useLeafletMap,
  useLeafletEvent,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const center = ref<LatLng | null>(null);

const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

useLeafletEvent(map, 'moveend', (e: LeafletEvent) => {
  center.value = (e.target as Map).getCenter();
});
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <div>Center: {{ center }}</div>
</template>
