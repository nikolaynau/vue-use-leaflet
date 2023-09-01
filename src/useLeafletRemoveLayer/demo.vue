<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveLayer,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const marker = useLeafletMarker([0, 0]);
useLeafletDisplayLayer(map, marker);

const remove = useLeafletRemoveLayer(marker);
// OR
// marker.value = null;
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="remove">Remove Marker</button>
</template>
