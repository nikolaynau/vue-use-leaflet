<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletDisplayControl,
  useLeafletLayersControl
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const visible = ref(false);
const layersControl = useLeafletLayersControl({ 'Open Street Map': tileLayer });

const { toggle } = useLeafletDisplayControl(map, layersControl, {
  controls: true,
  initialValue: visible
});
</script>

<template>
  <div ref="element" style="height: 250px"></div>
  <button @click="toggle()">Toggle Control</button>
  <span> Visible: {{ visible }}</span>
</template>
