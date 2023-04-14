<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDisplayControl,
  useLeafletLayersControl
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const visible = ref(true);
const layersControl = useLeafletLayersControl([
  { name: 'Open Street Map', layer: tileLayer }
]);

const toggle = useLeafletDisplayControl(map, layersControl, {
  initialValue: visible
});
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="toggle()">Toggle Control</button>
  <span> Visible: {{ visible }}</span>
</template>
