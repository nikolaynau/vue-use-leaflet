<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const visible = ref(true);
const marker = useLeafletMarker([0, 0]);

const toggle = useLeafletDisplayLayer(map, marker, {
  initialValue: visible
});
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="toggle()">Toggle Visible</button>
  <span> Visible: {{ visible }}</span>
</template>
