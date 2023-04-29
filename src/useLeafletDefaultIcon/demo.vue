<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletDefaultIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const icon = useLeafletDefaultIcon();
const marker = useLeafletMarker([0, 0], { icon });

useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 25rem"></div>
</template>
