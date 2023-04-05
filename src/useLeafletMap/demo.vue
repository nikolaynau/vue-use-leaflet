<script setup lang="ts">
import type { LatLngExpression } from 'leaflet';
import { ref, watch } from 'vue';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletDisplayLayer,
  type ViewChangedEvent
} from 'vue-use-leaflet';

const el = ref<HTMLElement | null>(null);
const center = ref<LatLngExpression>([0, 0]);
const zoom = ref(0);

const map = useLeafletMap(el, {
  center,
  zoom,
  onViewChanged
});

const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletDisplayLayer(map, tileLayer);

function onViewChanged(e: ViewChangedEvent) {
  center.value = e.center;
  zoom.value = e.zoom;
}

watch(map, () => {
  console.log(map.value);
});
</script>

<template>
  <div ref="el" style="height: 22rem"></div>
  <div class="output">Center: {{ center }}, Zoom: {{ zoom }}</div>
</template>

<style scoped>
.output {
  display: flex;
  align-items: end;
  height: 3rem;
}
</style>
