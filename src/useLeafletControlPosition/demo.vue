<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletControlPosition,
  useLeafletZoomControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el, { zoomControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

useLeafletControlPosition(map, ['center', 'right'], { flushSync: true });
const zoomControl = useLeafletZoomControl({
  position: 'centerright'
});

useLeafletDisplayControl(map, zoomControl);
</script>

<template>
  <div ref="el" style="height: 25rem"></div>
</template>

<style>
.leaflet-center {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
}

.leaflet-center {
  top: 50%;
  transform: translateY(-50%);
}
</style>
