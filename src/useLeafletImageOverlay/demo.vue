<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletImageOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const imageUrl = ref<string>('images/img1.jpg');

const imageOverlay = useLeafletImageOverlay(imageUrl, [
  [0, 0],
  [-20, -20]
]);
useLeafletDisplayLayer(map, imageOverlay);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="imageUrl = 'images/img2.jpg'">Change Image</button>
</template>
