<script setup lang="ts">
import { computed, ref } from 'vue';
import type { LatLngTuple } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletTooltip
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const latlng = ref<LatLngTuple>([0, 0]);
const content = computed(() => `LatLng: ${latlng.value[0]},${latlng.value[1]}`);

const tooltip = useLeafletTooltip(latlng, { content });
useLeafletDisplayLayer(map, tooltip);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="latlng = [-10, -10]">Change Position</button>
</template>
