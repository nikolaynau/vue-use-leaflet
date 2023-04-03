<script setup lang="ts">
import { ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayObject
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);

const toggle = useLeafletDisplayObject(map, tileLayer, {
  show: (source, target) => source.addLayer(target),
  hide: (source, target) => source.removeLayer(target),
  shown: (source, target) => source.hasLayer(target)
});
</script>

<template>
  <div ref="el" style="height: 250px"></div>
  <button @click="toggle()">Toggle</button>
</template>
