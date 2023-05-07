<script setup lang="ts">
import { ref } from 'vue';
import { Polygon, Polyline } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletPath
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const color = ref<string>('green');

const polygon = useLeafletPath(
  opt =>
    new Polygon(
      [
        [0, -15],
        [-5, -25],
        [-15, -25],
        [-10, -15]
      ],
      opt
    ),
  { color }
);
const polyline = useLeafletPath(
  opt =>
    new Polyline(
      [
        [0, 0],
        [-10, -5],
        [-5, -10],
        [-20, -15]
      ],
      opt
    ),
  { color }
);

useLeafletDisplayLayer(map, polyline);
useLeafletDisplayLayer(map, polygon);
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
