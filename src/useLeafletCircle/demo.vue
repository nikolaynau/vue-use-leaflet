<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletCircle
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 5 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const color = ref<string>('green');
const radius = ref<number>(200000); // 200km

const circle = useLeafletCircle([-10, -10], { radius, color });

useLeafletDisplayLayer(map, circle);
</script>

<template>
  <div ref="el" style="height: 19rem"></div>
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
  <br />
  <div>
    Radius:
    <select v-model.number="radius">
      <option value="100000">100km</option>
      <option value="200000">200km</option>
      <option value="300000">300km</option>
    </select>
    Selected: {{ radius }}
  </div>
</template>
