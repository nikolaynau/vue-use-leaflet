<script setup lang="ts">
import { Marker } from 'leaflet';
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer,
  useLeafletDeps
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const dep = ref(false);
const marker = useLeafletLayer(() => new Marker([0, 0]));

useLeafletDisplayLayer(map, useLeafletDeps(marker, dep));
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <button @click="dep = !dep">Toggle Dep</button>
  <br />
  Dep: {{ dep }}
</template>
