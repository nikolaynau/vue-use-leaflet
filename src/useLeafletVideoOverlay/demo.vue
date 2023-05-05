<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletVideoOverlay
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { center: [-10, -10], zoom: 3 });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const videoUrl = ref<string>(
  'https://labs.mapbox.com/bites/00188/patricia_nasa.webm'
);

const videoOverlay = useLeafletVideoOverlay(videoUrl, [
  [0, 0],
  [-20, -20]
]);
useLeafletDisplayLayer(map, videoOverlay);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button
    @click="
      videoUrl =
        'https://file-examples.com/storage/fe0d875dfd645260e96b346/2020/03/file_example_WEBM_480_900KB.webm'
    "
  >
    Change Video
  </button>
</template>
