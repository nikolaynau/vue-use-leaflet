<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletDeps
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const dep = ref(false);
const marker = useLeafletMarker([0, 0]);

useLeafletDisplayLayer(map, useLeafletDeps(marker, dep));
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="dep = !dep">Toggle Dep</button> Dep: {{ dep }}
</template>
