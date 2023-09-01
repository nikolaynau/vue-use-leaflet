<script setup lang="ts">
import { ref } from 'vue';
import { Marker, type LatLngExpression } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const position = ref<LatLngExpression>([0, 0]);
const marker = useLeafletLayer(() => new Marker(position.value), {
  updateSources: [
    {
      watch: position,
      handler: instance => instance.setLatLng(position.value)
    }
  ]
});
useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="position = [-10, -10]">Change Marker Position</button>
</template>
