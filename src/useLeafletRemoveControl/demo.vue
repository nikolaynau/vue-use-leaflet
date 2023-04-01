<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletRemoveControl,
  useLeafletZoomControl,
  useLeafletDisplayControl
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element, { zoomControl: false });
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const zoomControl = useLeafletZoomControl();
useLeafletDisplayControl(map, zoomControl);

const remove = useLeafletRemoveControl(zoomControl);
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <button @click="remove">Destroy Zoom Control</button>
</template>
