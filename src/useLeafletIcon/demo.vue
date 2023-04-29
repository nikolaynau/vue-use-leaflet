<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const iconUrl = ref('custom/marker-icon.png');
const icon = useLeafletIcon(iconUrl, {
  iconSize: [32, 42],
  iconAnchor: [16, 42]
});
const marker = useLeafletMarker([0, 0], { icon });

useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="iconUrl = 'custom/marker-icon-alt.png'">
    Change Icon Image
  </button>
  Icon Url: {{ iconUrl }}
</template>
