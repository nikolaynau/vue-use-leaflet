<script setup lang="ts">
import { ref } from 'vue';
import { Marker, type LatLngExpression } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletCreate
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const position = ref<LatLngExpression | undefined>(undefined);
const marker = useLeafletCreate(() => new Marker(position.value!), {
  watch: position
});
useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="position = [0, 0]">Set Position</button>
</template>
