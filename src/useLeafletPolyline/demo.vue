<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPolyline
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const color = ref<string>('green');

const polyline = useLeafletPolyline(
  [
    [0, 0],
    [-20, -20]
  ],
  { color }
);

const multiPolyline = useLeafletPolyline(
  [
    // create line1
    [
      [-10, 0],
      [-15, -5]
    ],
    // create line2
    [
      [-16, -6],
      [-21, -11]
    ],
    // create line3
    [
      [-22, -12],
      [-26, -16]
    ]
  ],
  { color }
);

useLeafletDisplayLayer(map, polyline);
useLeafletDisplayLayer(map, multiPolyline);
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
