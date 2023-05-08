<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRectangle
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const color = ref<string>('green');

const rectangle = useLeafletRectangle(
  [
    [0, 0],
    [-20, -20]
  ],
  { color }
);

useLeafletDisplayLayer(map, rectangle);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <div>
    Color:
    <select v-model="color">
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="red">Red</option>
      <option value="black">Black</option>
    </select>
    Selected: {{ color }}
  </div>
</template>
