<script setup lang="ts">
import { ref } from 'vue';
import { Marker } from 'leaflet';
import {
  useLeafletMap,
  useLeafletTileLayer,
  useLeafletToggleLayer,
  useLeafletLayer
} from 'vue-use-leaflet';

const element = ref<HTMLElement | null>(null);
const map = useLeafletMap(element);
const tileLayer = useLeafletTileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
);
useLeafletToggleLayer(map, tileLayer);

const marker = useLeafletLayer<Marker>({
  create: () => new Marker([0, 0]),
  destroy: instance => instance.off().remove()
});
useLeafletToggleLayer(map, marker);
</script>

<template>
  <div ref="element" style="height: 250px"></div>
</template>
