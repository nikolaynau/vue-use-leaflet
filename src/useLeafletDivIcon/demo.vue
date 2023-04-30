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
const iconA = useLeafletDivIcon(html, {
  iconSize: [26, 26],
  iconAnchor: [13, 13],
  className: 'counter-marker'
});
const markerA = useLeafletMarker([0, 0], { icon: iconA });
useLeafletDisplayLayer(map, markerA);

const iconEl = ref<HTMLElement | null>(null);
const iconB = useLeafletDivIcon(iconEl, {
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  className: 'counter-marker'
});
const markerB = useLeafletMarker([-25, -25], { icon: iconB });
useLeafletDisplayLayer(map, markerB);
</script>

<template>
  <div ref="el" style="height: 21rem"></div>
  <div ref="iconEl">{{ counter }}</div>
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
