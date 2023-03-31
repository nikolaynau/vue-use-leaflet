<script setup lang="ts">
import { ref } from 'vue';
import { CircleMarker, Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer,
  useLeafletDeps,
  useLeafletPane
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const { paneElements } = useLeafletPane(map, 'paneA', { zIndex: 800 });
useLeafletPane(map, 'paneB', { zIndex: 900, flushSync: true });

const marker = useLeafletLayer({
  create: () => new Marker([0, 0], { pane: 'paneA' })
});
const circle = useLeafletLayer({
  create: () =>
    new CircleMarker([0, 0], { radius: 20, pane: 'paneB', fillColor: '#000' })
});

useLeafletDisplayLayer(
  map,
  useLeafletDeps(marker, () => paneElements.value.paneA)
);

useLeafletDisplayLayer(map, circle);
</script>

<template>
  <div ref="element" style="height: 250px"></div>
</template>
