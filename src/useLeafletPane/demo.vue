<script setup lang="ts">
import { ref } from 'vue';
import { CircleMarker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  useLeafletLayer,
  useLeafletMarker,
  useLeafletDeps,
  useLeafletPane
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const map = useLeafletMap(el);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

const { paneElements } = useLeafletPane(map, 'paneA', { zIndex: 800 });
useLeafletPane(map, 'paneB', { zIndex: 900, flushSync: true });

const marker = useLeafletMarker([0, 0], { pane: 'paneA' });
const circle = useLeafletLayer(
  () =>
    new CircleMarker([0, 0], { radius: 20, pane: 'paneB', fillColor: '#000' })
);

useLeafletDisplayLayer(
  map,
  useLeafletDeps(marker, () => paneElements.value.paneA)
);

useLeafletDisplayLayer(map, circle);
</script>

<template>
  <div ref="el" style="height: 25rem"></div>
</template>
