<script setup lang="ts">
import { ref } from 'vue';
import type { LatLng, LeafletEvent, Map } from 'leaflet';
import {
  useLeafletMap,
  useLeafletEvent,
  useLeafletTileLayer,
  useLeafletDisplayLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const center = ref<LatLng | null>(null);

const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const cleanup = useLeafletEvent(map, 'moveend', (e: LeafletEvent) => {
  center.value = (e.target as Map).getCenter();
});
</script>

<template>
  <div ref="el" style="height: 20rem"></div>
  <br />
  <button @click="cleanup">Unregister Event</button>
  <div>Center: {{ center }}</div>
</template>
