<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletMarker,
  useLeafletDivIcon
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const counter = ref(10);
const html = computed(() => `<div>${counter.value}</div>`);
const icon = useLeafletDivIcon(html, {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: 'counter-marker'
});
const marker = useLeafletMarker([0, 0], { icon });

useLeafletDisplayLayer(map, marker);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <br />
  <button @click="counter++">Increment Counter</button> Counter: {{ counter }}
</template>

<style>
.counter-marker {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  background-color: green;
  color: white;
  border-radius: 50%;
}
</style>
