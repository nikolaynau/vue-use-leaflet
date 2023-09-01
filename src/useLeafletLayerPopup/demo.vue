<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletLayerPopup
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const marker = useLeafletMarker([0, 0]);

const { visible, toggle } = useLeafletLayerPopup(marker, 'Text', {
  visible: true
});

const toggleMarker = useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 19rem"></div>
  <br />
  <button @click="toggle">Toggle Popup</button> Visible: {{ visible }}
  <br />
  <button @click="toggleMarker()">Toggle Marker</button>
  <br />
  <button @click="visible = true">Set Visible</button>
</template>
