<script setup lang="ts">
import type { LatLngExpression } from 'leaflet';
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletEvent
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const simpleMarker = useLeafletMarker([0, 0]);
useLeafletDisplayLayer(map, simpleMarker);

const latLng = ref<LatLngExpression>([-20, -20]);
const draggable = ref(true);
const opacity = ref(1);

const draggableMarker = useLeafletMarker(latLng, {
  draggable,
  opacity
});
useLeafletDisplayLayer(map, draggableMarker);

useLeafletEvent(draggableMarker, 'click', e => {
  console.log('click:', e);
});
</script>

<template>
  <div ref="el" style="height: 19rem"></div>
  <br />
  <button @click="draggable = !draggable">Toggle Draggable Marker</button>
  Draggable: {{ draggable }}
  <br />
  <button @click="opacity = 0.5">Set Opacity</button>
  Opacity: {{ opacity }}
  <br />
  <button @click="latLng = [-15, -15]">Set New Position</button>
  LatLng: {{ latLng }}
</template>
